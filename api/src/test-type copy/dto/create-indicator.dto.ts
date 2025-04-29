import { BaseStringValidation } from 'src/shared/dto-validation';

export class CreateIndicatorDto {
  @BaseStringValidation('назва')
  name: string;

  @BaseStringValidation('назва')
  unit: string;

  @BaseStringValidation('опис', 255)
  description: string;
}
