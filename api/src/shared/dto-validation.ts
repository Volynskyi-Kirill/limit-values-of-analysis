import { applyDecorators } from '@nestjs/common';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import {
  UA_VALIDATION_MESSAGES,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from 'src/adminjs/translations/translations.ua';

export function BaseStringValidation(
  fieldName: string,
  maxLength: number = MAX_NAME_LENGTH,
) {
  return applyDecorators(
    IsString({ message: UA_VALIDATION_MESSAGES.isString(fieldName) }),
    IsNotEmpty({
      message: UA_VALIDATION_MESSAGES.generateRequiredMessage(fieldName),
    }),
    Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {
      message: UA_VALIDATION_MESSAGES.generateLengthMessage(
        fieldName,
        MIN_NAME_LENGTH,
        maxLength,
      ),
    }),
  );
}
