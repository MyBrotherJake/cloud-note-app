import { Module } from '@nestjs/common'
import { FoldersService } from './folders.service'
import { FoldersController } from './folders.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  providers: [FoldersService, PrismaService],
  controllers: [FoldersController]
})
export class FoldersModule { }
