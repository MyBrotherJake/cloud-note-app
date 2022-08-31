import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    private client: Auth.OAuth2Client

  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService
  ) {
    this.client = new google.auth.OAuth2({
      clientId: config.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_AUTH_CLIENT_SECRET')
    })
  }

  async authenticate(token: string): Promise<User> {
    const tokenInfo = await this.client.getTokenInfo(token)
    const email = tokenInfo.email

    try {
      const user = await this.usersService.findByEmail(email)
      // アカウントが未作成の場合はサインアップ処理
      if (!user) {
        // user info APIから名前のみ取得
        const { name } = await this.fetchUserInfo(token)
        return this.usersService.create({ email, name })
      }
      return user
    } catch (e: unknown) {
      console.log(e)
      throw new UnauthorizedException()
    }
  }

  async fetchUserInfo(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo
    this.client.setCredentials({ access_token: token })
    const response = await userInfoClient.get({ auth: this.client })
    return response.data
  }
}
