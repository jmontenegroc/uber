/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class DriverDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

}
