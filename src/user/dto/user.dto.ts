import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsOptional()
  phone?: number
}
