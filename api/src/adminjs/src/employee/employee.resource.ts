import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import {
  handleAfterListEmployees,
  handleBeforeNewEmployee,
  handleDeleteAccessEmployee,
  handleEditAccessEmployee,
} from './employee.handler';
import { loadComponents } from '../../components/components';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';

export const EmployeeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('Employee'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: {
        icon: 'Users',
      },
      actions: {
        new: {
          before: handleBeforeNewEmployee,
        },
        edit: {
          isAccessible: handleEditAccessEmployee,
        },
        delete: {
          isAccessible: handleDeleteAccessEmployee,
        },
        list: {
          after: handleAfterListEmployees,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
        lastName: {
          isTitle: true,
        },
        role: {
          type: 'enum',
          components: {
            edit: Components.RoleSelect,
          },
        },
      },
    },
  };
};
