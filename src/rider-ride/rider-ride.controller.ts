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
import { RiderRideService } from './rider-ride.service';

@Controller('rider')
@UseInterceptors(BusinessErrorsInterceptor)
export class RiderRideController {
  constructor(private readonly riderRideService: RiderRideService) {}

  @Post(':riderId/ride/:rideId')
  async addRideRider(
    @Param('riderId') riderId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.riderRideService.addRideRider(riderId, rideId);
  }

  @Get(':riderId/rides/:rideId')
  async findRideByRiderIdRideId(
    @Param('riderId') riderId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.riderRideService.findRideByRiderIdRideId(
      riderId,
      rideId,
    );
  }

  @Get(':riderId/rides')
  async findRidesByRiderId(@Param('riderId') riderId: string) {
    return await this.riderRideService.findRidesByRiderId(riderId);
  }

  @Put(':riderId/rides')
  async associateRidesRider(
    @Body() ridesDto: RideDto[],
    @Param('riderId') riderId: string,
  ) {
    const rides = plainToInstance(RideEntity, ridesDto);
    return await this.riderRideService.associateRidesRider(riderId, rides);
  }

  @Delete(':riderId/ride/:rideId')
  @HttpCode(204)
  async deleteRideRider(
    @Param('riderId') riderId: string,
    @Param('rideId') rideId: string,
  ) {
    return await this.riderRideService.deleteRideRider(riderId, rideId);
  }
}
