import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findAnalyses(userId: number) {
    return this.prismaService.test.findMany({
      where: {
        userId,
      },
      include: {
        indicatorRange: {
          select: {
            gender: true,
            minValue: true,
            maxValue: true,
            indicator: {
              select: {
                name: true,
                unit: true,
                description: true,
                testType: {
                  select: {
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
