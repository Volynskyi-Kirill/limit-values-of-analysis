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
          isVisible: false,
        },
        list: {
          before: async (request: any, context: any) => {
            request.query = {
              ...request.query,
              prisma: {
                include: {
                  indicator: {
                    include: {
                      testType: true,
                    },
                  },
                },
              },
            };

            return request;
          },
          after: async (response: any, request: any, context: any) => {
            const { records } = response;

            for (const record of records) {
              const indicatorId = record.params.indicator;
              const indicator = await prismaAdminJSClient.indicator.findUnique({
                where: { id: indicatorId },
                include: { testType: true },
              });
              record.params.testType =
                indicator?.testType?.name || 'Невідомий тест';
            }

            return response;
          },
        },
        show: {
          after: async (response: any, request: any, context: any) => {
            const record = response.record;
            const indicatorId = record.params.indicator;

            const indicator = await prismaAdminJSClient.indicator.findUnique({
              where: { id: indicatorId },
              include: { testType: true },
            });

            record.params.testType =
              indicator?.testType?.name || 'Невідомий тест';

            return response;
          },
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
        testType: {
          isVisible: { list: true, show: true, edit: false },
          isVirtual: true,
          type: 'string',
        },
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
