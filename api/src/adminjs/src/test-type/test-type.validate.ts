import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTestTypeDto } from 'src/test-type/dto/create-test-type.dto';

export const validateTestTypeDto = async (payload: any) => {
  const createTestTypeDto = plainToInstance(CreateTestTypeDto, payload);

  const errors = await validate(createTestTypeDto);

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
