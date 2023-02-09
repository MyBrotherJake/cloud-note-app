import { Injectable, NotFoundException } from '@nestjs/common'
import { Folder } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateFolderDto): Promise<Folder> {
    const folder = await this.prisma.folder.create({
      data: {
        name: dto.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })
    return folder
  }

  async update(id: string, dto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.prisma.folder.findFirst({
      where: { id, destroyedAt: null }
    })
    if (!folder) throw new NotFoundException('フォルダが存在しません')

    const updated = await this.prisma.folder.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date().toISOString()
      }
    })
    return updated
  }

  async archive(id: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({
      where: { id }
    })
    if (!folder) throw new NotFoundException('フォルダが存在しません')

    const archived = await this.prisma.folder.update({
      where: { id },
      data: {
        destroyedAt: new Date().toISOString(),
        notes: { set: [] }
      },
      include: { notes: true }
    })
    return archived
  }
}
