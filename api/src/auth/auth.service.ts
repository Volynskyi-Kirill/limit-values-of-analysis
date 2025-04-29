import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  generateToken(email: string) {
    return this.jwtService.sign({ email }, { secret: this.secret });
  }

  async createLink(token: string) {
    const link = `${this.clientUrl}/auth/confirm?token=${token}`;
    return `<p><a href="${link}">Увійти до облікового запису</a></p>`;
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Невалидный токен');
    }
  }
}
