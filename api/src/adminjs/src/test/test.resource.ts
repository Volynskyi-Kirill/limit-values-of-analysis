import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import {
  applyIndicatorRange,
  handleBeforeNewTest,
  listAfterHook,
  showAfterHook,
} from './test.handler';
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
