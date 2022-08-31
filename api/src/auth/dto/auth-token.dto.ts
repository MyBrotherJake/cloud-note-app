import { IsNotEmpty, IsString } from 'class-validator';

export class AuthTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string
}
