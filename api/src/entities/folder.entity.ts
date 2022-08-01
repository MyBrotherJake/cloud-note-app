import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  name: string

  @Column()
  createdAt: string

  @Column()
  updatedAt: string
}
