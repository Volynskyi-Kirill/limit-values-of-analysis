import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req as any;

    return this.userService.findByEmail(user?.email);
  }

  @Public()
  @Get('/:id/analyses')
  getAnalyses(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findAnalyses(userId);
  }
}
