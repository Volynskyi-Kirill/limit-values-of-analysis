import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleBeforeNewTestType } from './test-type.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import {
  exceptMedicalEmployee,
  handleUpdatedAt,
} from 'src/adminjs/shared/handlers';

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
