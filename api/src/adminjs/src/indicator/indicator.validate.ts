import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateIndicatorDto } from 'src/indicator/dto/create-indicator.dto';

export const validateIndicatorDto = async (payload: any) => {
  const createIndicatorDto = plainToInstance(CreateIndicatorDto, payload);

  const errors = await validate(createIndicatorDto);

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
