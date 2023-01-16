import { Folder, Note } from '@prisma/client';

export interface FoldersAndNotes {
  folders: Folder[],
  notesWithoutFolder: Note[]
}
