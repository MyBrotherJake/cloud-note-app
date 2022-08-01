import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';
import { User } from './user.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  name: string

  @Column()
  userId: string

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  @OneToMany(() => Note, (note) => note.folder)
  notes: Note[]

  @ManyToOne(() => User, (user) => user.folders)
  user: User
}
