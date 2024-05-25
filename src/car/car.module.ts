/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarEntity } from './car.entity/car.entity';
import { CarService } from './car.service';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([CarEntity])],

})
export class CarModule {}
