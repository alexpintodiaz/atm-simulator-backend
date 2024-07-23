import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER'
}

export enum StatusType {
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export class CreateTransactionDto {
  @IsString()
  accountId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsEnum(StatusType)
  status: StatusType;

  @IsOptional()
  metadata?: Record<string, any>;
}

