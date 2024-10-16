import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import {
  handleBeforeNewIndicatorRange,
  handleBeforeSaveIndicatorRange,
  handleGetIndicatorsByTestId,
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
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
        id: {
          isVisible: false,
        },
        indicator: {
          reference: 'Indicator',
          isRequired: true,
          components: {
            edit: Components.IndicatorSelect,
          },
        },
        // testType: {
        //   isVisible: { list: true, show: true, edit: false },
        //   isVirtual: true,

        // },
        testId: {
          reference: 'TestType',
          isRequired: true,
          isVisible: { list: false, show: false, edit: true },
          components: {
            edit: Components.TestSelect,
          },
        },
      },
    },
  };
};
