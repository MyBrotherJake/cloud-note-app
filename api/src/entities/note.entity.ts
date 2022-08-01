import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
