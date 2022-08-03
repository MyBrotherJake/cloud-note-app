import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from 'src/entities/note.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateNoteDto } from './dto/update-note.dto';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async updateNote(updateNoteDto: UpdateNoteDto): Promise<Note> {
    const { noteId, folderId, title, content } = updateNoteDto
    const note = await this.findOne(noteId)
    note.title = title
    note.content = content
    note.updatedAt = new Date().toISOString()
    if (folderId) note.folderId = folderId

    await this.save(note)
    return note
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { folderId } = createNoteDto
    const note = this.create({
      folderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    await this.save(note)
    return note
  }
}
