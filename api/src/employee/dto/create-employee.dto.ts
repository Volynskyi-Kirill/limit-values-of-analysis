import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UA_VALIDATION_MESSAGES } from 'src/adminjs/translations/translations.ua';

export class CreateEmployeeDto {
  @IsEmail({}, { message: UA_VALIDATION_MESSAGES.email.isEmail })
  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.email.isNotEmpty })
  email: string;

  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.password.isNotEmpty })
  password: string;

  @IsEnum(Role, { message: UA_VALIDATION_MESSAGES.role.isEnum })
  @IsOptional()
  role?: Role;

  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.firstName.isNotEmpty })
  firstName: string;

  @IsNotEmpty({ message: UA_VALIDATION_MESSAGES.lastName.isNotEmpty })
  lastName: string;

  @IsOptional()
  createdById?: number;
}
