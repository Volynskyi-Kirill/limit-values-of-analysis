import { validateDto } from 'src/adminjs/shared/validate.dto';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';

export const validateEmployeeDto = async (payload: any) => {
  await validateDto(CreateEmployeeDto, payload);
};
