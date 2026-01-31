-- ============================================================
-- Run this in Supabase SQL Editor if you want: when a folder
-- is deleted, ALL notes inside that folder are also deleted
-- (instead of moving to "no folder").
-- ============================================================
-- This changes notes.folder_id from ON DELETE SET NULL to
-- ON DELETE CASCADE. After this, deleting a folder will
-- automatically delete all notes in that folder in the database.
-- ============================================================

alter table public.notes drop constraint if exists notes_folder_id_fkey;
alter table public.notes add constraint notes_folder_id_fkey
  foreign key (folder_id) references public.folders (id) on delete cascade;
