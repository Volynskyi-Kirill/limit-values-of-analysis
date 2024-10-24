import { Gender } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UA_VALIDATION_MESSAGES } from 'src/adminjs/translations/translations.ua';
import { BaseStringValidation } from 'src/shared/dto-validation';

export class CreateUserDto {
  @BaseStringValidation("ім'я")
  firstName: string;

  @BaseStringValidation('прізвище')
  lastName: string;

  @BaseStringValidation('по батькові')
  patronymic: string;

  @BaseStringValidation('документ')
  document: string;

  @IsEmail({}, { message: UA_VALIDATION_MESSAGES.email.isEmail })
  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.email.isNotEmpty })
  email: string;

  @IsEnum(Gender, { message: UA_VALIDATION_MESSAGES.gender.isEnum })
  gender: Gender;

  birthDate: Date;
}
