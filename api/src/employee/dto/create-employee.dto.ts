import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsOptional()
  createdById?: number;
}
