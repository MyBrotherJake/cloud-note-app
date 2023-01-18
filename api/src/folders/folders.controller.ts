import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common'
import { Folder } from '@prisma/client';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly folder: FoldersService) { }

  @Post()
  async create(@Body() dto: CreateFolderDto): Promise<Folder> {
    return await this.folder.create(dto)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFolderDto
  ): Promise<Folder> {
    return await this.folder.update(id, dto)
  }

  @Delete(':id')
  async archive(@Param('id', ParseUUIDPipe) id: string): Promise<Folder> {
    return await this.folder.archive(id)
  }
}
