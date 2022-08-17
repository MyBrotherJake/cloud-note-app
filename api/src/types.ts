import { Folder } from './entities/folder.entity';
import { Note } from './entities/note.entity';

export interface FoldersAndNotes {
  folders: Folder[],
  notesWithoutFolder: Note[]
}
