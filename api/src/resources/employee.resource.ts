import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const EmployeeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');

  return {
    resource: {
      model: getModelByName('Employee'),
      client: prismaAdminJSClient,
    },
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
  };
};
