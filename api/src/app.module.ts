import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

type AdminModuleType = {
  createAdminAsync: (options: any) => any;
};

@Module({
  imports: [
    (async () => {
      const AdminJS = (await import('adminjs')).default;
      const { Database, Resource, getModelByName } = await import(
        '@adminjs/prisma'
      );
      const { AdminModule }: { AdminModule: AdminModuleType } = await import(
        '@adminjs/nestjs'
      );

      AdminJS.registerAdapter({ Database, Resource });
      const prisma = new PrismaService();

      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: { model: getModelByName('Employee'), client: prisma },
                options: {
                  properties: {
                    role: {
                      type: 'string',
                      availableValues: [
                        { value: 'SUPER_ADMIN', label: 'супер адмін' },
                        { value: 'ADMIN', label: 'адмін' },
                        { value: 'MED_WORKER', label: 'мед працівник' },
                      ],
                    },
                  },
                },
              },
            ],
          },
        }),
      });
    })(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
