import { User } from './../entities/user.entity';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(@Body() dto: AuthTokenDto, @Req() req: Request): Promise<User> {
    return this.authService.authenticate(dto.token)
  }
}
