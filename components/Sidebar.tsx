import React, { useRef, useMemo } from 'react';
import { Note, Folder } from '../types';
import { Plus, MessageSquare, Trash2, BookOpen, Download, Upload, Database, Search, FolderPlus, CheckSquare, Square, X } from 'lucide-react';

function noteMatchesSearch(note: Note, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (note.title.toLowerCase().includes(q)) return true;
  return note.paragraphs.some((p) => p.text.toLowerCase().includes(q));
}

interface SidebarProps {
  notes: Note[];
  currentNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  folders?: Folder[];
  selectedFolderId?: string | null;
  onSelectFolder?: (folderId: string | null) => void;
  onCreateFolder?: () => void;
  onDeleteFolder?: (folderId: string) => void;
  selectionMode?: boolean;
  selectedNoteIds?: Set<string>;
  onToggleSelectionMode?: () => void;
  onToggleSelectNote?: (id: string) => void;
  onDeleteSelected?: () => void;
  variant?: 'sidebar' | 'full';
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  currentNoteId,
  onSelectNote,
  onNewNote,
  onDeleteNote,
  onExport,
  onImport,
  searchQuery = '',
  onSearchChange,
  folders = [],
  selectedFolderId = null,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
  selectionMode = false,
  selectedNoteIds = new Set(),
  onToggleSelectionMode,
  onToggleSelectNote,
  onDeleteSelected,
  variant = 'sidebar',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredNotes = useMemo(() => {
    const list = searchQuery.trim()
      ? notes.filter((n) => noteMatchesSearch(n, searchQuery))
      : notes;
    return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, searchQuery]);

  const isFull = variant === 'full';

  return (
    <div
      className={`h-full bg-slate-50 flex flex-col ${
        isFull ? 'w-full' : 'w-72 md:w-80 border-r border-slate-200'
      }`}
    >
      <div className={`${isFull ? 'p-3 space-y-2.5' : 'p-4 md:p-6'}`}>
        {!isFull && (
          <h1 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 md:mb-6">
            <BookOpen className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
            স্বরলিপি AI
          </h1>
        )}
        {/* Mobile (full): compact row of two buttons; Desktop: single New Note button */}
        {isFull ? (
          <div className="flex gap-2">
            <button
              onClick={onNewNote}
              className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 text-white border-0 py-2.5 px-3 rounded-xl hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm"
            >
              <Plus size={18} />
              নতুন নোট
            </button>
            {onCreateFolder && (
              <button
                type="button"
                onClick={onCreateFolder}
                className="flex items-center justify-center gap-1.5 text-slate-600 bg-white border border-slate-200 py-2.5 px-3 rounded-xl hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium text-sm"
              >
                <FolderPlus size={18} />
                নতুন ফোল্ডার
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onNewNote}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-slate-300 text-slate-600 p-2.5 md:p-3 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium text-sm md:text-base"
          >
            <Plus size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">নতুন নোট তৈরি করুন</span>
            <span className="sm:hidden">নতুন নোট</span>
          </button>
        )}
        {onSearchChange && (
          <div className={isFull ? 'relative' : 'mt-3 relative'}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="নোট খুঁজুন (শিরোনাম বা লেখা)..."
              className={`w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${!isFull ? 'rounded-lg' : ''}`}
            />
          </div>
        )}
        {onSelectFolder && (
          <div className={!isFull ? 'mt-3 space-y-2' : 'flex gap-2'}>
            <select
              value={selectedFolderId ?? ''}
              onChange={(e) => onSelectFolder(e.target.value === '' ? null : e.target.value)}
              className={`flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${!isFull ? 'rounded-lg' : ''}`}
            >
              <option value="">সব নোট</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            {onDeleteFolder && selectedFolderId && (
              <button
                type="button"
                onClick={() => onDeleteFolder(selectedFolderId)}
                title="ফোল্ডার মুছুন"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors shrink-0"
                aria-label="Delete folder"
              >
                <Trash2 size={16} />
              </button>
            )}
            {!isFull && onCreateFolder && (
              <button
                type="button"
                onClick={onCreateFolder}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-lg py-2 hover:bg-indigo-50/50 transition-colors"
              >
                <FolderPlus size={14} />
                নতুন ফোল্ডার
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 md:px-4 space-y-2 pb-4 md:pb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">লাইব্রেরী</h2>
          {onToggleSelectionMode && filteredNotes.length > 0 && (
            selectionMode ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onDeleteSelected}
                  disabled={selectedNoteIds.size === 0}
                  className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 disabled:opacity-50 font-medium"
                >
                  <Trash2 size={14} />
                  নির্বাচিত মুছুন {selectedNoteIds.size > 0 && `(${selectedNoteIds.size})`}
                </button>
                <button
                  type="button"
                  onClick={onToggleSelectionMode}
                  className="p-1.5 text-slate-500 hover:text-slate-700 rounded"
                  title="বাতিল"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onToggleSelectionMode}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <CheckSquare size={14} />
                নির্বাচন
              </button>
            )
          )}
        </div>
        {filteredNotes.length === 0 ? (
          <p className="px-2 text-xs md:text-sm text-slate-400 italic">
            {searchQuery.trim() ? 'খুঁজে কোন নোট পাওয়া যায়নি' : 'কোন নোট নেই'}
          </p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center gap-2 p-2.5 md:p-3 rounded-xl cursor-pointer transition-all ${
                currentNoteId === note.id && !selectionMode ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-white text-slate-600'
              } ${selectionMode && selectedNoteIds.has(note.id) ? 'ring-2 ring-indigo-400 bg-indigo-50/50' : ''}`}
              onClick={() => {
                if (selectionMode && onToggleSelectNote) onToggleSelectNote(note.id);
                else onSelectNote(note.id);
              }}
            >
              {selectionMode && onToggleSelectNote ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onToggleSelectNote(note.id); }}
                  className="flex-shrink-0 p-0.5 text-indigo-600"
                  aria-label={selectedNoteIds.has(note.id) ? 'Deselect' : 'Select'}
                >
                  {selectedNoteIds.has(note.id) ? <CheckSquare size={20} /> : <Square size={20} className="text-slate-300" />}
                </button>
              ) : null}
              <div className="flex items-center gap-2 md:gap-3 overflow-hidden min-w-0 flex-1">
                <MessageSquare size={16} className={`md:w-[18px] md:h-[18px] flex-shrink-0 ${currentNoteId === note.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                <span className="truncate font-medium text-sm md:text-base">{note.title || 'শিরোনামহীন নোট'}</span>
              </div>
              {!selectionMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex-shrink-0 touch-manipulation"
                  title="নোট মুছুন"
                  aria-label="Delete note"
                >
                  <Trash2 size={16} className="md:w-4 md:h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-3 md:p-4 border-t border-slate-200 bg-slate-100/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 md:mb-3 px-2">
          <Database size={11} className="md:w-3 md:h-3" />
          স্টোরেজ ও ব্যাকআপ
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-1.5 md:gap-2 text-xs bg-white border border-slate-200 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-600 font-medium shadow-sm"
          >
            <Download size={12} className="md:w-3.5 md:h-3.5" />
            ব্যাকআপ
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-1.5 md:gap-2 text-xs bg-white border border-slate-200 p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all text-slate-600 font-medium shadow-sm"
          >
            <Upload size={12} className="md:w-3.5 md:h-3.5" />
            ইমপোর্ট
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImport}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
