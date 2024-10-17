import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { applyIndicatorRange, handleBeforeNewTest } from './test.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { handleUpdatedAt } from 'src/adminjs/shared/handlers';

export const TestResource = async () => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('Test'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: { icon: 'Clipboard' },
      actions: {
        new: {
          before: [handleBeforeNewTest, applyIndicatorRange],
        },
        edit: {
          before: [handleUpdatedAt, applyIndicatorRange],
        },
        list: {
          after: async (response: any) => {
            const { records } = response;
            for (const record of records) {
              const indicatorRangeId = record.params.indicatorRange;

              const indicatorRange =
                await prismaAdminJSClient.indicatorRange.findUnique({
                  where: { id: indicatorRangeId },
                  include: {
                    indicator: { include: { testType: true } },
                  },
                });

              record.params.testType =
                indicatorRange?.indicator?.testType?.name ||
                'Невідомий тип тесту';
              record.params.indicator =
                indicatorRange?.indicator?.name || 'Невідомий індикатор';
            }
            return response;
          },
        },
        show: {
          after: async (response: any) => {
            const record = response.record;
            const indicatorRangeId = record.params.indicatorRange;

            const indicatorRange =
              await prismaAdminJSClient.indicatorRange.findUnique({
                where: { id: indicatorRangeId },
                include: {
                  indicator: { include: { testType: true } },
                },
              });

            record.params.testType =
              indicatorRange?.indicator?.testType?.name ||
              'Невідомий тип тесту';
            record.params.indicator =
              indicatorRange?.indicator?.name || 'Невідомий індикатор';

            return response;
          },
        },
      },
      properties: {
        createdBy: DEFAULT_CREATED_BY_OPTION,
        id: {
          isVisible: false,
        },
        user: {
          position: 1,
        },
        testType: {
          reference: 'TestType',
          isRequired: true,
          components: {
            edit: Components.TestSelect,
          },
          position: 2,
        },
        indicator: {
          reference: 'Indicator',
          isRequired: true,
          components: {
            edit: Components.IndicatorSelect,
          },
          position: 3,
        },
        indicatorRange: {
          isVisible: false,
        },
      },
    },
  };
};
