import { FolderRepository } from './../folders/folder.repository';
import { UserRepository } from './../users/user.repository';
import { NoteRepository } from './note.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    NoteRepository,
    UserRepository, 
    FolderRepository
  ])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
