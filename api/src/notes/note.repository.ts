import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from 'src/entities/note.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateNoteDto } from './dto/update-note.dto';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async findNotesWithoutFolder(): Promise<Note[]> {
    // TODO userIdによる絞り込み
    return await this.find({ 
      where: {
        folderId: null
      }
    })
  }

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
    const { folderId, userId } = createNoteDto
    const note = this.create({
      folderId,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    await this.save(note)
    return note
  }
}
