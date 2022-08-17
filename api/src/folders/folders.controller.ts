import { FoldersService } from './folders.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from '../entities/folder.entity';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async create(@Body() createFolderDto: CreateFolderDto): Promise<Folder> {
    return await this.foldersService.create(createFolderDto)
  } 
}
