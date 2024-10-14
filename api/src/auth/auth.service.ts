import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  secret: string;
  clientUrl: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.secret = this.configService.get('JWT_SECRET')!;
    this.clientUrl = this.configService.get('CLIENT_URL')!;
  }

  generateToken(id: string, email: string) {
    return this.jwtService.sign({ id, email }, { secret: this.secret });
  }

  async createLink(token: string) {
    const link = `${this.clientUrl}/auth/${token}`;
    return `<p><a href="${link}">Увійти до облікового запису</a></p>`;
  }
}
