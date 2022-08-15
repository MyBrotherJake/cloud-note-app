import { Folder } from '../entities/folder.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {}
