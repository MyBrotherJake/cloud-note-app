import { IsUUID } from 'class-validator';

export class CreateNoteDto {
  @IsUUID()
  folderId: string
}