import { Injectable, NotFoundException } from '@nestjs/common'
import { Note } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { FoldersAndNotes } from 'src/types'
import { UpdateNoteDto } from './dto/update-note.dto'

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Note> {
    const note = await this.prisma.note.findFirst({
      where: {
        id,
        archivedAt: null,
        destroyedAt: null
      }
    })
    if (!note) throw new NotFoundException('ノートが見つかりません')

    return note
  }

  async findAll(): Promise<FoldersAndNotes> {
    const folders = await this.prisma.folder.findMany({
      where: { destroyedAt: null },
      orderBy: { createdAt: 'asc' },
      include: {
        notes: {
          where: { archivedAt: null, destroyedAt: null },
          orderBy: { createdAt: 'asc' }
        }
      }
    })
    const notesWithoutFolder = await this.prisma.note.findMany({
      where: {
        folder: null,
        archivedAt: null,
        destroyedAt: null
      },
      orderBy: { createdAt: 'asc' }
    })
    return { folders, notesWithoutFolder }
  }

  async create(): Promise<Note> {
    const note = await this.prisma.note.create({
      data: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })
    return note
  }

  async update(id: string, dto: UpdateNoteDto): Promise<Note> {
    const note = await this.prisma.note.findFirst({
      where: {
        id,
        archivedAt: null,
        destroyedAt: null
      }
    })
    if (!note) throw new NotFoundException('ノートが見つかりません')

    if (dto.folderId) {
      const folder = await this.prisma.folder.findFirst({
        where: {
          id: dto.folderId,
          destroyedAt: null
        }
      })
      if (!folder) throw new NotFoundException('フォルダが存在しません')
    }

    const updated = await this.prisma.note.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
        folderId: dto.folderId || null,
        updatedAt: new Date().toISOString()
      }
    })
    return updated
  }

  async archive(id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id }
    })
    if (!note) throw new NotFoundException('ノートが見つかりません')

    const archived = await this.prisma.note.update({
      where: { id: note.id },
      data: {
        folder: { disconnect: true },
        archivedAt: new Date().toISOString()
      }
    })
    return archived
  }
}
