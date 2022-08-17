import { FolderRepository } from './folder.repository';
import { Injectable } from '@nestjs/common';
import { Folder } from '../entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FoldersService {
  constructor(private readonly folderRepository: FolderRepository) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    return await this.folderRepository.createFolder(createFolderDto)    
  }
}
