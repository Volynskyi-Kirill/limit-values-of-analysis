import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import {
  handleAfterListEmployees,
  handleBeforeEditEmployee,
  handleBeforeNewEmployee,
  handleDeleteAccessEmployee,
  handleEditAccessEmployee,
} from './employee.handler';
import { loadComponents } from '../../components/components';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { exceptMedicalEmployee } from 'src/adminjs/shared/handlers';

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
          isAccessible: exceptMedicalEmployee,
        },
        edit: {
          before: handleBeforeEditEmployee,
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
