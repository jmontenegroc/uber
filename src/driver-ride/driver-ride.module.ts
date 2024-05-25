/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { DriverRideService } from './driver-ride.service';
import { DriverRideController } from './driver-ride.controller';

@Module({
  providers: [DriverRideService],
  imports: [TypeOrmModule.forFeature([RideEntity, DriverEntity])],
  controllers: [DriverRideController],
})
export class DriverRideModule {}
