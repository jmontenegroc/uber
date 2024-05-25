/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RideDto } from 'src/ride/ride.dto/ride.dto';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { DriverRideService } from './driver-ride.service';

@Controller('driver')
@UseInterceptors(BusinessErrorsInterceptor)
export class DriverRideController {
  constructor(private readonly driverRideService: DriverRideService) {}

  @Post(':driverId/ride/:rideId')
  async addRideDriver(
    @Param('driverId') driverId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.driverRideService.addRideDriver(driverId, rideId);
  }

  @Get(':driverId/rides/:rideId')
  async findRideByDriverIdRideId(
    @Param('driverId') driverId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.driverRideService.findRideByDriverIdRideId(
      driverId,
      rideId,
    );
  }

  @Get(':driverId/rides')
  async findRidesByDriverId(@Param('driverId') driverId: string) {
    return await this.driverRideService.findRidesByDriverId(driverId);
  }

  @Put(':driverId/rides')
  async associateRidesDriver(
    @Body() ridesDto: RideDto[],
    @Param('driverId') driverId: string,
  ) {
    const rides = plainToInstance(RideEntity, ridesDto);
    return await this.driverRideService.associateRidesDriver(driverId, rides);
  }

  @Delete(':driverId/ride/:rideId')
  @HttpCode(204)
  async deleteRideDriver(
    @Param('driverId') driverId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.driverRideService.deleteRideDriver(driverId, rideId);
  }
}
