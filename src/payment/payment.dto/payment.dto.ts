/* eslint-disable prettier/prettier */
import {
    IsCreditCard,
    IsDateString,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsCreditCard()
  @IsNotEmpty()
  readonly cardNumber: string;

  @IsDateString()
  @IsNotEmpty()
  readonly expirationDate: string;

  @IsString()
  @IsNotEmpty()
  readonly cvv: string;
}
