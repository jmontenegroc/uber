/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RiderDto } from './rider.dto/rider.dto';
import { RiderEntity } from './rider.entity/rider.entity';
import { RiderService } from './rider.service';


@Controller('riders')
@UseInterceptors(BusinessErrorsInterceptor)
export class RiderController {
    constructor(private readonly riderService: RiderService) {}

  @Get()
  async findAll() {
    return await this.riderService.findAll();
  }

  @Get(':riderId')
  async findOne(@Param('riderId') riderId: string) {
    return await this.riderService.findOne(riderId);
  }

  @Post()
  async create(@Body() riderDto: RiderDto) {
    const rider: RiderEntity = plainToInstance(RiderEntity, riderDto);
    return await this.riderService.create(rider);
  }

  @Put(':riderId')
  async update(@Param('riderId') riderId: string, @Body() riderDto: RiderDto) {
    const rider: RiderEntity = plainToInstance(RiderEntity, riderDto);
    return await this.riderService.update(riderId, rider);
  }

  @Delete(':riderId')
  @HttpCode(204)
  async delete(@Param('riderId') riderId: string) {
    return await this.riderService.delete(riderId);
  }
}