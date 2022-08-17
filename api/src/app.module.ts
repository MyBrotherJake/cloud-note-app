import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    NotesModule,
    UsersModule,
    FoldersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
