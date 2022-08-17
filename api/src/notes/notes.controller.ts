import { FoldersAndNotes } from './../types';
import { NotesService } from './notes.service';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from '../entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<FoldersAndNotes> {
    return await this.notesService.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Note> {
    return await this.notesService.findById(id)
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesService.create(createNoteDto)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ): Promise<Note> {
    return await this.notesService.update(updateNoteDto)
  }

  @Delete(':id')
  async archive(@Param('id', ParseUUIDPipe) id: string): Promise<Note> {
    return await this.notesService.archive(id)
  }
}
