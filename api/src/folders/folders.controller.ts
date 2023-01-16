import { Body, Controller, Post } from '@nestjs/common'
import { Folder } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly folder: FoldersService) { }

  @Post()
  async create(@Body() dto: CreateFolderDto): Promise<Folder> {
    return await this.folder.create(dto)
  }
}
