import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateFolderDto {
  // @IsUUID()
  // @IsNotEmpty()
  // userId: string

  @IsNotEmpty()
  name: string
}