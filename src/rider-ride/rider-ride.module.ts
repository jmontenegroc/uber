import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { RiderRideService } from './rider-ride.service';
import { RiderRideController } from './rider-ride.controller';

@Module({
  providers: [RiderRideService],
  imports: [TypeOrmModule.forFeature([RideEntity, RiderEntity])],
  controllers: [RiderRideController],
})
export class RiderRideModule {}
