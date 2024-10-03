import { PrismaService } from '../prisma/prisma.service';

const prisma = new PrismaService();

export const EmployeeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');

  return {
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
  };
};
