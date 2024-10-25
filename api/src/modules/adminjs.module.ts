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
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { dashboardHandler } from 'src/adminjs/lib/dashboardHandler';

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
      const { Components, componentLoader } = await loadComponents();
      AdminJS.registerAdapter({ Database, Resource });

      const employeeResource = await EmployeeResource();
      const testTypeResource = await TestTypeResource();
      const indicatorResource = await IndicatorResource();
      const indicatorRangeResource = await IndicatorRangeResource();
      const testResource = await TestResource();

      const sessionOptions: any = {
        resave: true,
        saveUninitialized: true,
        secret: 'secret',
        cookie: {
          maxAge: 24 * 60 * 60 * 1000,
        },
      };

      if (process.env.NODE_ENV === 'development') {
        const redisClient = createClient({
          url: 'redis://localhost:6379',
        });
        redisClient.on('error', (err) =>
          console.log('Redis Client Error', err),
        );
        await redisClient.connect();
        const redisStore = new RedisStore({ client: redisClient });
        sessionOptions.store = redisStore;
      }

      return AdminModule.createAdminAsync({
        imports: [EmployeeModule, AuthModule, MailModule],
        useFactory: async (
          employeeService: EmployeeService,
          authService: AuthService,
          mailService: MailService,
        ) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              employeeResource,
              testTypeResource,
              indicatorResource,
              indicatorRangeResource,
              testResource,
              await UserResource(authService, mailService),
            ],
            dashboard: {
              component: Components.Dashboard,
              handler: dashboardHandler,
            },
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
          sessionOptions,
        }),
        inject: [EmployeeService, AuthService, MailService],
      });
    })(),
  ],
})
export class AdminJSModule {}
