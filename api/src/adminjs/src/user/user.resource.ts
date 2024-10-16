import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { loadComponents } from '../../components/components';
import { handleAfterNewUser, handleBeforeNewUser } from './user.handler';
import { DEFAULT_CREATED_BY_OPTION } from 'src/adminjs/shared/options';
import { handleUpdatedAt } from 'src/adminjs/shared/handlers';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

export const UserResource = async (
  authService: AuthService,
  mailService: MailService,
) => {
  const { getModelByName } = await import('@adminjs/prisma');
  const { Components } = await loadComponents();

  return {
    resource: {
      model: getModelByName('User'),
      client: prismaAdminJSClient,
    },
    options: {
      navigation: {
        icon: 'User',
      },
      actions: {
        new: {
          before: handleBeforeNewUser,
          after: (originalResponse: any, request: any) =>
            handleAfterNewUser(originalResponse, request, {
              authService,
              mailService,
            }),
        },
        edit: {
          before: handleUpdatedAt,
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
