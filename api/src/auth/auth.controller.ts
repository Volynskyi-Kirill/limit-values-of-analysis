import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/link')
  async createLink(@Body() createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;

    const token = await this.authService.generateToken(email);
    const html = await this.authService.createLink(token);
    this.mailService.sendMessage({ email, html, subject: 'Magic link' });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/confirm')
  async confirmAuth(@Body() confirmAuthDto: ConfirmAuthDto) {
    const { token } = confirmAuthDto;

    const payload = await this.authService.verifyToken(token);
    return { message: 'Авторизация успешна', payload };
  }
}
