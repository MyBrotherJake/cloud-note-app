import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

export class UpdateNoteDto {
  @IsUUID()
  folderId: string

  @IsUUID()
  @IsNotEmpty()
  noteId: string

  @IsString()
  @MaxLength(40)
  title: string

  @IsString()
  content: string
}