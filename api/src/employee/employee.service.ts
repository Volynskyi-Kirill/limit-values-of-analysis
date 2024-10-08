import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}

  findByEmail(email: string) {
    return this.prismaService.employee.findUnique({
      where: {
        email,
      },
    });
  }

  async authenticate(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      return null; 
    }

    const isAuthSuccess = user.password === password;
    return isAuthSuccess ? user : null; 
  }
}
