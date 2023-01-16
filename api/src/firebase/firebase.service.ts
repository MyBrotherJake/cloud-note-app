import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as firebase from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'

@Injectable()
export class FirebaseService {
  private app: firebase.app.App

  constructor(private readonly config: ConfigService) {
    const serviceAccount: ServiceAccount = {
      projectId: config.get('FIREBASE_ADMIN_PROJECT_ID'),
      clientEmail: config.get('FIREBASE_ADMIN_CLIENT_EMAIL'),
      privateKey: config.get('FIREBASE_ADMIN_PRIVATE_KEY')

    }

    if (firebase.app.length === 0) {
      this.app = firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
      })
    }
  }

  getAuth = (): firebase.auth.Auth => {
    return this.app.auth()
  }
}
