import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from './folder.entity';
import { Note } from './note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[]

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[]
}
