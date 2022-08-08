import { FolderRepository } from './../folders/folder.repository';
import { UserRepository } from '../users/user.repository';
import { NoteRepository } from './note.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from '../entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userRepository: UserRepository,
    private readonly folderRepository: FolderRepository
  ) {}

  async findById(id: string): Promise<Note> {
    const note = await this.noteRepository.findOne(id)
    if (!note) throw new NotFoundException('ノートが見つかりません')

    return note
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find()
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.noteRepository.createNote(createNoteDto) 
  }

  async update(updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne(updateNoteDto.noteId)
    if (!note) throw new NotFoundException('ノートが見つかりません')

    if (updateNoteDto.folderId) {
      const folder = await this.folderRepository.findOne(updateNoteDto.folderId)
      if (!folder) throw new NotFoundException('フォルダが存在しません')
    }

    return await this.noteRepository.updateNote(updateNoteDto)
  }

  async archive(id: string): Promise<Note> {
    throw new Error('Method not implemented.');
  }

}