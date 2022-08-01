import { Folder } from './folder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  title: string

  @Column()
  content: string

  @Column()
  userId: string

  @Column()
  folderId: string

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  @Column()
  archivedAt: string

  @Column()
  destroyedAt: string

  @ManyToOne(() => Folder, (folder) => folder.notes)
  folder: Folder

  @ManyToOne(() => User, (user) => user.notes)
  user: User
}
