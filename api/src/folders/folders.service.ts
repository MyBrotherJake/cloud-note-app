import { Injectable } from '@nestjs/common'
import { Folder } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFolderDto } from './dto/create-folder.dto'

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateFolderDto): Promise<Folder> {
    // seedユーザーを取得する仮実装
    const user = await this.prisma.user.findFirst()
    const folder = await this.prisma.folder.create({
      data: {
        user: { connect: { id: user.id } },
        name: dto.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })
    return folder
  }
}
