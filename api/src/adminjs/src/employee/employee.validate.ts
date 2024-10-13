import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';

export const validateEmployeeDto = async (payload: any) => {
  const createEmployeeDto = plainToInstance(CreateEmployeeDto, payload);

  const errors = await validate(createEmployeeDto);

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
