/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RideDto {
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  readonly origin: string;

  @IsString()
  @IsNotEmpty()
  readonly destination: string;

  @IsNumber()
  @IsNotEmpty()
  readonly distance: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: string;

  @IsNumber()
  @IsNotEmpty()
  readonly fare: string;

}
