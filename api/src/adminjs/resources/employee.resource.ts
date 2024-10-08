import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import {
  availableRolesForAdmin,
  availableRolesForOwner,
} from '../ui/constants';
import { Role } from '@prisma/client';
import {
  handleAfterListEmployees,
  handleBeforeNewEmployee,
} from '../handlers/employee.handler';
import { loadComponents } from '../components/components';

const getAvailableRoles = (currentUserRole: Role) => {
  switch (currentUserRole) {
    case Role.SUPER_ADMIN:
      return availableRolesForOwner;
    case Role.ADMIN:
      return availableRolesForAdmin;
    default:
      return [];
  }
};

export const EmployeeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

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
          components: {
            select: Components.RoleSelect,
          },
        },
        // role: {
        //   type: 'enum',
        //   enumValues: [
        //     // Перечисляем значения Enum
        //     Role.SUPER_ADMIN,
        //     Role.ADMIN,
        //     Role.MED_WORKER,
        //   ],

        //   availableValues: availableRolesForOwner,
        // },
      },
    },
  };
};
