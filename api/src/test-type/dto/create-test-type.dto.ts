import { BaseStringValidation } from 'src/shared/dto-validation';

export class CreateTestTypeDto {
  @BaseStringValidation('назва')
  name: string;

  @BaseStringValidation('опис', 255)
  description: string;
}
