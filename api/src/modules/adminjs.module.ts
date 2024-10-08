import { Module } from '@nestjs/common';
import { EmployeeResource } from '../adminjs/resources/employee.resource';
import { PrismaService } from '../prisma/prisma.service';

type AdminModuleType = {
  createAdminAsync: (options: any) => any;
};

export const prismaAdminJSClient = new PrismaService();

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
})
export class AdminJSModule {}
