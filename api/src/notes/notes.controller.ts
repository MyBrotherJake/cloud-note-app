import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common'
import { Note } from '@prisma/client'
import { FoldersAndNotes } from 'src/types'
import { UpdateNoteDto } from './dto/update-note.dto'
import { NotesService } from './notes.service'

@Controller('notes')
export class NotesController {
  constructor(private readonly note: NotesService) { }

  @Get()
  async findAll(): Promise<FoldersAndNotes> {
    return await this.note.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Note> {
    return await this.note.findById(id)
  }

  @Post()
  async create(): Promise<Note> {
    return await this.note.create()
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNoteDto
  ): Promise<Note> {
    return await this.note.update(id, dto)
  }

  @Delete(':id')
  async archive(@Param('id', ParseUUIDPipe) id: string): Promise<Note> {
    return await this.note.archive(id)
  }
}
