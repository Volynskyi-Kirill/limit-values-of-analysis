import { Role } from '@prisma/client';

export class CreateEmployeeDto {
  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  password: string;

  // @IsEnum(Role)
  // @IsOptional()
  role?: Role;

  // @IsOptional()
  createdById?: number;
}
