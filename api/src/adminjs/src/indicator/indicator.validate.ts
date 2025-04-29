import { validateDto } from 'src/adminjs/shared/validate.dto';
import { CreateIndicatorDto } from 'src/indicator/dto/create-indicator.dto';

export const validateIndicatorDto = async (payload: any) => {
  await validateDto(CreateIndicatorDto, payload);
};
