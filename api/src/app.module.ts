import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    NotesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
