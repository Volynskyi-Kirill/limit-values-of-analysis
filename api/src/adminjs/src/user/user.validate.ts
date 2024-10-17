import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
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
  const createUserDto = plainToInstance(CreateUserDto, payload);

  const errors = await validate(createUserDto);

  if (errors.length > 0) {
    const validationErrors: Record<string, any> = {};

    errors.forEach((error) => {
      if (error.constraints) {
        validationErrors[error.property] = {
          message: Object.values(error.constraints).join(', '),
        };
      }
    });

    const { ValidationError } = await import('adminjs');

    throw new ValidationError(validationErrors);
  }
};
