/* eslint-disable prettier/prettier */
import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { DriverCarService } from './driver-car.service';

@Controller('driver')
@UseInterceptors(BusinessErrorsInterceptor)
export class DriverCarController {
  constructor(private readonly driverCarService: DriverCarService) {}

  @Post(':driverId/car/:carId')
  async addCarDriver(
    @Param('driverId') driverId: string,
    @Param('carId') carId: string,
  ) {
    return await this.driverCarService.addCarDriver(driverId, carId);
  }

  @Put(':driverId/car/:carId')
  async associateCarDriver(
    @Param('driverId') driverId: string,
    @Param('carId') carId: string,
  ) {
    return await this.driverCarService.associateCarsDriver(driverId, carId);
  }

  @Get(':driverId/car')
  async findCarByDriverId(@Param('driverId') driverId: string) {
    return await this.driverCarService.findCarByDriverId(driverId);
  }

  @Delete(':driverId/car/:carId')
  @HttpCode(204)
  async deleteCarDriver(
    @Param('driverId') driverId: string,
    @Param('carId') carId: string,
  ) {
    return await this.driverCarService.deleteCarDriver(driverId, carId);
  }
}
