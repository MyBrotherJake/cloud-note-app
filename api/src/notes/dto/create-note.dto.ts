import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateNoteDto {
  @IsUUID()
  folderId: string

  // @IsUUID()
  // @IsNotEmpty()
  // userId: string
}