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
      actions: {
        new: {
          before: async (request: any) => {
            const currentUser = request.session.adminUser;
            request.payload.createdBy = currentUser.id;
            return request;
          },
        },
      },
      properties: {
        createdBy: {
          isVisible: {
            list: true,
            new: false,
            show: true,
            filter: true,
          },
        },
        role: {
          type: 'string',
          availableValues: availableRolesForOwner,
        },
      },
    },
  };
};
