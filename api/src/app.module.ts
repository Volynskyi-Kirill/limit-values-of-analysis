import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { EmployeeResource } from './resources/employee.resource';

type AdminModuleType = {
  createAdminAsync: (options: any) => any;
};

@Module({
  imports: [
    (async () => {
      const AdminJS = (await import('adminjs')).default;
      const { Database, Resource } = await import('@adminjs/prisma');
      const { AdminModule }: { AdminModule: AdminModuleType } = await import(
        '@adminjs/nestjs'
      );

      AdminJS.registerAdapter({ Database, Resource });
      const employeeResource = await EmployeeResource();

      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [employeeResource],
          },
        }),
      });
    })(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
