/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CarDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsNumber()
  @IsNotEmpty()
  readonly model: number;

  @IsString()
  @IsNotEmpty()
  readonly licensePlate: string;

  @IsNumber()
  @IsNotEmpty()
  readonly seats: string;
}
