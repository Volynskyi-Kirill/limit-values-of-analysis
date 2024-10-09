import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { availableRolesForOwner } from '../ui/constants';

import {
  handleAfterListEmployees,
  handleBeforeNewEmployee,
} from '../handlers/employee.handler';

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
          before: handleBeforeNewEmployee,
        },
        list: {
          after: handleAfterListEmployees,
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
          type: 'enum',
          availableValues: availableRolesForOwner,
        },
      },
    },
  };
};
