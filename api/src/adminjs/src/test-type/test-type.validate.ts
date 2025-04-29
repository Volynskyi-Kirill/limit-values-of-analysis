import { validateDto } from 'src/adminjs/shared/validate.dto';
import { CreateTestTypeDto } from 'src/test-type/dto/create-test-type.dto';

export const validateTestTypeDto = async (payload: any) => {
  await validateDto(CreateTestTypeDto, payload);
};
