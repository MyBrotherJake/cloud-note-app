import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FoldersModule } from './folders/folders.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    FirebaseModule,
    FoldersModule,
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
