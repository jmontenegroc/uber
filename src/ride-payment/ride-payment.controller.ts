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
import { RidePaymentService } from './ride-payment.service';

  @Controller('payment')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PaymentRideController {
    constructor(private readonly paymentRideService: RidePaymentService) {}
  
    @Post(':paymentId/ride/:rideId')
    async addRidePayment(
      @Param('paymentId') paymentId: string,
      @Param('rideId') rideId: string,
    ) {
      return await this.paymentRideService.addRidePayment(paymentId, rideId);
    }
  
    @Get(':paymentId/rides/:rideId')
    async findRideByPaymentIdRideId(
      @Param('paymentId') paymentId: string,
      @Param('rideId') rideId: string,
    ) {
      return await this.paymentRideService.findRideByPaymentIdRideId(
        paymentId,
        rideId,
      );
    }
  
    @Get(':paymentId/rides')
    async findRidesByPaymentId(@Param('paymentId') paymentId: string) {
      return await this.paymentRideService.findRidesByPaymentId(paymentId);
    }
  
    @Put(':paymentId/rides')
    async associateRidesPayment(
      @Body() ridesDto: RideDto[],
      @Param('paymentId') paymentId: string,
    ) {
      const rides = plainToInstance(RideEntity, ridesDto);
      return await this.paymentRideService.associateRidesPayment(paymentId, rides);
    }
  
    @Delete(':paymentId/ride/:rideId')
    @HttpCode(204)
    async deleteRidePayment(
      @Param('paymentId') paymentId: string,
      @Param('rideId') rideId: string,
    ) {
      return await this.paymentRideService.deleteRidePayment(paymentId, rideId);
    }
  }
  