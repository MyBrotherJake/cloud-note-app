import { Folder } from '../entities/folder.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {
  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    const { userId, name } = createFolderDto
    const folder = this.create({
      userId,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()      
    })

    await this.save(folder)
    return folder
  }
}
