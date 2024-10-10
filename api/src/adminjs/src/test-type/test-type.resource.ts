import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewTestType } from './test-type.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';

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
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
      },
    },
  };
};
