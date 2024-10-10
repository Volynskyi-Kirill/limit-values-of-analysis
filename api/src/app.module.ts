import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminJSModule } from './modules/adminjs.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AdminJSModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
