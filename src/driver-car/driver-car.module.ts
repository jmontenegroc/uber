/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/car/car.entity/car.entity';
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { DriverCarService } from './driver-car.service';
import { DriverCarController } from './driver-car.controller';

@Module({
  providers: [DriverCarService],
  imports: [TypeOrmModule.forFeature([DriverEntity, CarEntity])],
  controllers: [DriverCarController],
})
export class DriverCarModule {}
