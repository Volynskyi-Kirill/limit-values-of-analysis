import { Module } from '@nestjs/common';
import { EmployeeResource } from '../adminjs/src/employee/employee.resource';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeService } from 'src/employee/employee.service';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { loadComponents } from 'src/adminjs/components/components';
import { TestTypeResource } from 'src/adminjs/src/test-type/test-type.resource';
import { IndicatorResource } from 'src/adminjs/src/indicator/indicator.resource';
import { IndicatorRangeResource } from 'src/adminjs/src/indicator-range/indicator-range.resource';
import { TestResource } from 'src/adminjs/src/test/test.resource';
import { UserResource } from 'src/adminjs/src/user/user.resource';
import { TRANSLATION_UA } from 'src/adminjs/translations/translations.ua';

type AdminModuleType = {
  createAdminAsync: (options: any) => any;
};

export const prismaAdminJSClient = new PrismaService();

@Module({
  imports: [
    (async () => {
      const AdminJS = (await import('adminjs')).default;
      const { locales } = await import('adminjs');
      const { Database, Resource } = await import('@adminjs/prisma');
      const { AdminModule }: { AdminModule: AdminModuleType } = await import(
        '@adminjs/nestjs'
      );
      const { componentLoader } = await loadComponents();
      AdminJS.registerAdapter({ Database, Resource });

      const employeeResource = await EmployeeResource();
      const testTypeResource = await TestTypeResource();
      const indicatorResource = await IndicatorResource();
      const indicatorRangeResource = await IndicatorRangeResource();
      const testResource = await TestResource();
      const userResource = await UserResource();

      const redisClient = createClient({
        url: 'redis://localhost:6379',
      });
      redisClient.on('error', (err) => console.log('Redis Client Error', err));

      await redisClient.connect();
      const redisStore = new RedisStore({ client: redisClient });

      return AdminModule.createAdminAsync({
        imports: [EmployeeModule],
        useFactory: async (employeeService: EmployeeService) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              employeeResource,
              testTypeResource,
              indicatorResource,
              indicatorRangeResource,
              testResource,
              userResource,
            ],
            componentLoader,
            locale: {
              language: 'ua',
              availableLanguages: ['ua'],
              translations: {
                ua: TRANSLATION_UA,
              },
            },
          },
          auth: {
            authenticate: (email: string, password: string) =>
              employeeService.authenticate(email, password),
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            store: redisStore,
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
