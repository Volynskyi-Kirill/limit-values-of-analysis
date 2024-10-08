import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { availableRolesForOwner } from '../ui/constants';

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
          availableValues: availableRolesForOwner,
        },
      },
    },
  };
};
