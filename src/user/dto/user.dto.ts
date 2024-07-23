import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  phone?: number

  @IsInt()
  pin: number
}
