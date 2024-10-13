import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewTestType } from './test-type.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { handleUpdatedAt } from 'src/adminjs/shared/handler.updatead-at';

export const TestTypeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('TestType'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: { icon: 'Layers' },
      actions: {
        new: {
          before: handleBeforeNewTestType,
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
