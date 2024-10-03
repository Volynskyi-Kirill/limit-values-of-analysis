import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminJSModule } from './modules/adminjs.module';

@Module({
  imports: [AdminJSModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
