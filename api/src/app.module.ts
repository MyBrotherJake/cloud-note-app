import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
    UsersModule,
    FoldersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
