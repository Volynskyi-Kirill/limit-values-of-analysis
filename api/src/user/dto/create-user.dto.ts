import { Gender } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsEnum,
  Length,
} from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  UA_VALIDATION_MESSAGES,
} from 'src/adminjs/translations/translations.ua';

export class CreateUserDto {
  @IsString({ message: UA_VALIDATION_MESSAGES.firstName.isNotEmpty })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {
    message: UA_VALIDATION_MESSAGES.firstName.length,
  })
  firstName: string;

  @IsString({ message: UA_VALIDATION_MESSAGES.lastName.isNotEmpty })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {
    message: UA_VALIDATION_MESSAGES.lastName.length,
  })
  lastName: string;

  @IsString({ message: UA_VALIDATION_MESSAGES.patronymic.isNotEmpty })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {
    message: UA_VALIDATION_MESSAGES.patronymic.length,
  })
  patronymic: string;

  @IsEmail({}, { message: UA_VALIDATION_MESSAGES.email.isEmail })
  email: string;

  @IsEnum(Gender, { message: UA_VALIDATION_MESSAGES.gender.isEnum })
  gender: Gender;

  birthDate: Date;
}
