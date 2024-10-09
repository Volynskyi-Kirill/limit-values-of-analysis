import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import {
  handleAfterListEmployees,
  handleBeforeNewEmployee,
} from '../handlers/employee.handler';
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
          before: async (request: any) => {
            const currentUser = request.session.adminUser;
            console.log('request.payload: ', request.payload);
            return request;
          },
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
