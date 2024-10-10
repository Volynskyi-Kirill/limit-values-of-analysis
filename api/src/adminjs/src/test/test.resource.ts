import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewTest } from './test.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';

export const TestResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('Test'),
      client: prismaAdminJSClient,
    },
    options: {
      actions: {
        new: {
          before: handleBeforeNewTest,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
      },
    },
  };
};
