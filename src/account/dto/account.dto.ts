import { IsNotEmpty } from 'class-validator'

export class RecipientAccountDto {
  @IsNotEmpty()
  account_number: string

  @IsNotEmpty()
  amount: number
}
