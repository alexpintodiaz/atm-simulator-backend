import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER_SENT = 'TRANSFER_SENT',
  TRANSFER_RECEIVED = 'TRANSFER_RECEIVED'
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

