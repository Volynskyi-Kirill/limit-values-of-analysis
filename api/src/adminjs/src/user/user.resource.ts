import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewUser } from './user.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { handleUpdatedAt } from 'src/adminjs/shared/handlers';

export const UserResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('User'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: {
        icon: 'User',
      },
      actions: {
        new: {
          before: handleBeforeNewUser,
        },
        edit: {
          before: handleUpdatedAt,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
      },
    },
  };
};
