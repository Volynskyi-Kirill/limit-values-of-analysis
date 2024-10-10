import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewIndicator } from './indicator.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';

export const IndicatorResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('Indicator'),
      client: prismaAdminJSClient,
    },
    options: {
      actions: {
        new: {
          before: handleBeforeNewIndicator,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
      },
    },
  };
};
