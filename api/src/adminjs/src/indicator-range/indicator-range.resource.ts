import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import {
  handleBeforeNewIndicatorRange,
  handleBeforeSaveIndicatorRange,
  handleGetIndicatorsByTestId,
  listAfterHook,
  listBeforeHook,
  showAfterHook,
} from './indicator-range.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import {
  exceptMedicalEmployee,
  handleUpdatedAt,
} from 'src/adminjs/shared/handlers';

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
          before: [
            handleBeforeSaveIndicatorRange,
            handleBeforeNewIndicatorRange,
          ],
          isAccessible: exceptMedicalEmployee,
        },
        edit: {
          before: [handleBeforeSaveIndicatorRange, handleUpdatedAt],
          isAccessible: exceptMedicalEmployee,
        },
        delete: {
          isAccessible: exceptMedicalEmployee,
        },
        getIndicatorsByTestId: {
          actionType: 'resource',
          handler: handleGetIndicatorsByTestId,
          isVisible: false,
        },
        list: {
          before: listBeforeHook,
          after: listAfterHook,
        },
        show: {
          after: showAfterHook,
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
        id: {
          isVisible: false,
        },
        testType: {
          isVisible: { list: true, show: true, edit: false },
          isVirtual: true,
          type: 'string',
          position: 1,
        },
        testId: {
          reference: 'TestType',
          isRequired: true,
          isVisible: { list: false, show: false, edit: true },
          components: {
            edit: Components.TestSelect,
          },
          position: 1,
        },
        indicator: {
          reference: 'Indicator',
          isRequired: true,
          components: {
            edit: Components.IndicatorSelect,
          },
          position: 2,
        },
        unit: {
          isVisible: { list: true, show: true, edit: false },
          position: 3,
        },
        createdAt: {
          isVisible: { list: false, show: true, filter: true },
        },
        updatedAt: {
          isVisible: { list: false, show: true, filter: true },
        },
      },
    },
  };
};
