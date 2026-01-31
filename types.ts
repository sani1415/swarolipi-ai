export interface TranscriptParagraph {
  id: string;
  text: string;
  timestamp: number;
}

export interface Folder {
  id: string;
  name: string;
  created_at?: string;
}

export interface Note {
  id: string;
  title: string;
  paragraphs: TranscriptParagraph[];
  updatedAt: number;
  createdAt: number;
  folder_id?: string | null;
}

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'transcribing';
