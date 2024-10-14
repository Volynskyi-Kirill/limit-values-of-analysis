import { UA_VALIDATION_MESSAGES } from 'src/adminjs/translations/translations.ua';
import { prismaAdminJSClient } from 'src/modules/adminjs.module';

export const validateUniqueEmail = async (email: string) => {
  const existingUser = await prismaAdminJSClient.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const { ValidationError } = await import('adminjs');
    throw new ValidationError({
      email: {
        message: UA_VALIDATION_MESSAGES.email.isUnique,
      },
    });
  }
};
