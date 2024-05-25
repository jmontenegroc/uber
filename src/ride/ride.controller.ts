/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RideDto } from './ride.dto/ride.dto';
import { RideEntity } from './ride.entity/ride.entity';
import { RideService } from './ride.service';


@Controller('rides')
@UseInterceptors(BusinessErrorsInterceptor)
export class RideController {
    constructor(private readonly rideService: RideService) {}

  @Get()
  async findAll() {
    return await this.rideService.findAll();
  }

  @Get(':rideId')
  async findOne(@Param('rideId') rideId: string) {
    return await this.rideService.findOne(rideId);
  }

  @Post()
  async create(@Body() rideDto: RideDto) {
    const ride: RideEntity = plainToInstance(RideEntity, rideDto);
    return await this.rideService.create(ride);
  }

  @Put(':rideId')
  async update(@Param('rideId') rideId: string, @Body() rideDto: RideDto) {
    const ride: RideEntity = plainToInstance(RideEntity, rideDto);
    return await this.rideService.update(rideId, ride);
  }

  @Delete(':rideId')
  @HttpCode(204)
  async delete(@Param('rideId') rideId: string) {
    return await this.rideService.delete(rideId);
  }
}