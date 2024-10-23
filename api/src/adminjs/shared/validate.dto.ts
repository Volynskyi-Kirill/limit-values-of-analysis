import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = async (DtoClass: any, payload: any) => {
  const dtoInstance = plainToInstance(DtoClass, payload);

  const errors = await validate(dtoInstance);

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
