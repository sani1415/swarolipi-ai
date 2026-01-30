
import React, { useRef } from 'react';
import { Note } from '../types';
import { Plus, MessageSquare, Trash2, BookOpen, Download, Upload, Database } from 'lucide-react';

interface SidebarProps {
  notes: Note[];
  currentNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  notes, 
  currentNoteId, 
  onSelectNote, 
  onNewNote, 
  onDeleteNote,
  onExport,
  onImport
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-72 md:w-80 h-full bg-slate-50 border-r border-slate-200 flex flex-col">
      <div className="p-4 md:p-6">
        <h1 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 md:mb-6">
          <BookOpen className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
          স্বরলিপি AI
        </h1>
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-slate-300 text-slate-600 p-2.5 md:p-3 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium text-sm md:text-base"
        >
          <Plus size={16} className="md:w-[18px] md:h-[18px]" />
          <span className="hidden sm:inline">নতুন নোট তৈরি করুন</span>
          <span className="sm:hidden">নতুন নোট</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 md:px-4 space-y-2 pb-4 md:pb-6">
        <h2 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">লাইব্রেরী</h2>
        {notes.length === 0 ? (
          <p className="px-2 text-xs md:text-sm text-slate-400 italic">কোন নোট নেই</p>
        ) : (
          notes.sort((a,b) => b.updatedAt - a.updatedAt).map((note) => (
            <div
              key={note.id}
              className={`group flex items-center justify-between p-2.5 md:p-3 rounded-xl cursor-pointer transition-all ${
                currentNoteId === note.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-white text-slate-600'
              }`}
              onClick={() => onSelectNote(note.id)}
            >
              <div className="flex items-center gap-2 md:gap-3 overflow-hidden min-w-0 flex-1">
                <MessageSquare size={16} className={`md:w-[18px] md:h-[18px] flex-shrink-0 ${currentNoteId === note.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                <span className="truncate font-medium text-sm md:text-base">{note.title || 'শিরোনামহীন নোট'}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="opacity-0 group-hover:opacity-100 md:opacity-0 p-1 hover:text-red-600 transition-all flex-shrink-0"
              >
                <Trash2 size={14} className="md:w-4 md:h-4" />
              </button>
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
