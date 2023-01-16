import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Note, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { FoldersAndNotes } from 'src/types'
import { CreateNoteDto } from './dto/create-note.dto'
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
      include: {
        notes: {
          where: {
            archivedAt: null,
            destroyedAt: null
          }
        }
      }
    })
    const notesWithoutFolder = await this.prisma.note.findMany({
      where: {
        // TODO userIDで絞り込み
        folder: null,
        archivedAt: null,
        destroyedAt: null
      }
    })
    return { folders, notesWithoutFolder }
  }

  async create(dto: CreateNoteDto): Promise<Note> {
    // seedユーザーを取得する仮実装
    const user = await this.prisma.user.findFirst()
    const folder = await this.prisma.folder.findFirst({
      where: {
        id: dto.folderId,
        destroyedAt: null
      }
    })

    const note = await this.prisma.note.create({
      data: {
        user: { connect: { id: user.id } },
        folder: folder ? { connect: { id: folder.id } } : undefined,
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
        ...dto,
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
