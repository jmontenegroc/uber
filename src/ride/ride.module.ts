/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideController } from './ride.controller';
import { RideEntity } from './ride.entity/ride.entity';
import { RideService } from './ride.service';

@Module({
  providers: [RideService],
  controllers: [RideController],
  imports: [TypeOrmModule.forFeature([RideEntity])],

})
export class RideModule {}
