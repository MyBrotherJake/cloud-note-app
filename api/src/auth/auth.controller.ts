import { User } from './../entities/user.entity';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('client')
  async fetchClientId() {
    return process.env.GOOGLE_AUTH_CLIENT_ID
  }

  @Post()
  async authenticate(@Body() dto: AuthTokenDto, @Req() req: Request): Promise<User> {
    return this.authService.authenticate(dto.token)
  }
}
