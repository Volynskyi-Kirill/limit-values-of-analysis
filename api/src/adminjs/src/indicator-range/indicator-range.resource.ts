import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewIndicatorRange } from './indicator-range.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { handleUpdatedAt } from 'src/adminjs/shared/handler.updatead-at';

export const IndicatorRangeResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('IndicatorRange'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: { icon: 'BarChart' },
      actions: {
        new: {
          before: handleBeforeNewIndicatorRange,
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
