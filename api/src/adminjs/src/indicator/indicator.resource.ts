import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewIndicator } from './indicator.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import {
  exceptMedicalEmployee,
  handleUpdatedAt,
} from 'src/adminjs/shared/handlers';
import { Role } from '@prisma/client';

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
          before: handleUpdatedAt,
          isAccessible: exceptMedicalEmployee,
        },
        delete: {
          isAccessible: exceptMedicalEmployee,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
      },
    },
  };
};
