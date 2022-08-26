import { UserRepository } from './../users/user.repository';
import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: Auth.OAuth2Client

  constructor(
    private readonly config: ConfigService,
    private readonly userRepository: UserRepository
  ) {
    this.client = new google.auth.OAuth2({
      clientId: config.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_AUTH_CLIENT_SECRET')
    })
  }

  async authenticate(token: string) {
    const tokenInfo = await this.client.getTokenInfo(token)
    const email = tokenInfo.email

    console.log(email)
  } 
}
