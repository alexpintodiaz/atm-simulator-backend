import { IsNotEmpty } from "class-validator";

export class AuthenticationDto {
    @IsNotEmpty()
    account_number: string

    @IsNotEmpty()
    pin: string
}
