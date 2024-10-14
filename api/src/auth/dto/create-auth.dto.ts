import { IsEmail, IsNotEmpty } from 'class-validator';
import { UA_VALIDATION_MESSAGES } from 'src/adminjs/translations/translations.ua';

export class CreateAuthDto {
  @IsEmail({}, { message: UA_VALIDATION_MESSAGES.email.isEmail })
  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.email.isNotEmpty })
  email: string;
}
