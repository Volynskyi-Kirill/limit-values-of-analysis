import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import {
  handleAfterListEmployees,
  handleBeforeNewEmployee,
  handleDeleteAccessEmployee,
  handleEditAccessEmployee,
} from './employee.handler';
import { loadComponents } from '../components/components';

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
            edit: Components.RoleSelect,
          },
        },
      },
    },
  };
};
