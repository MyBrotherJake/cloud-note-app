import { FolderRepository } from './folder.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    FolderRepository
  ])],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
