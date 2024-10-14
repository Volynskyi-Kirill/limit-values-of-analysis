import {
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req;
    console.log('user: ', user);
    return user;
  }
}
