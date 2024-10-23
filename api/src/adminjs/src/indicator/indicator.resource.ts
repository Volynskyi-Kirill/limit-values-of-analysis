import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import {
  handleBeforeEditTestType,
  handleBeforeNewIndicator,
} from './indicator.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import {
  exceptMedicalEmployee,
  handleUpdatedAt,
} from 'src/adminjs/shared/handlers';

export const IndicatorResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('Indicator'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: { icon: 'Activity' },
      actions: {
        new: {
          before: handleBeforeNewIndicator,
          isAccessible: exceptMedicalEmployee,
        },
        edit: {
          before: [handleUpdatedAt, handleBeforeEditTestType],
          isAccessible: exceptMedicalEmployee,
        },
        delete: {
          isAccessible: false,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
        id: {
          isVisible: false,
        },
      },
    },
  };
};
