import { Module } from '@nestjs/common';
import { EmployeeResource } from '../adminjs/resources/employee.resource';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeService } from 'src/employee/employee.service';

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
        imports: [EmployeeModule],
        useFactory: async (employeeService: EmployeeService) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [employeeResource],
          },
          auth: {
            authenticate: (email: string, password: string) =>
              employeeService.authenticate(email, password),
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
            cookie: {
              maxAge: 24 * 60 * 60 * 1000, // 24 часа
            },
          },
        }),
        inject: [EmployeeService],
      });
    })(),
  ],
})
export class AdminJSModule {}
