import { Folder } from './folder.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  content: string

  @Column()
  userId: string

  @Column({ nullable: true })
  folderId: string

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  @Column({ nullable: true })
  archivedAt: string

  @Column({ nullable: true })
  destroyedAt: string

  @ManyToOne(() => Folder, (folder) => folder.notes)
  folder: Folder

  @ManyToOne(() => User, (user) => user.notes)
  user: User
}
