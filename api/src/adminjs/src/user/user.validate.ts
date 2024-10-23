import { validateDto } from 'src/adminjs/shared/validate.dto';
import { UA_VALIDATION_MESSAGES } from 'src/adminjs/translations/translations.ua';
import { prismaAdminJSClient } from 'src/modules/adminjs.module';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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

export const validateUserDto = async (payload: any) => {
  await validateDto(CreateUserDto, payload);
};
