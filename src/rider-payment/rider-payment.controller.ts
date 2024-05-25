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
import { PaymentDto } from 'src/payment/payment.dto/payment.dto';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RiderPaymentService } from './rider-payment.service';

@Controller('rider')
@UseInterceptors(BusinessErrorsInterceptor)
export class RiderPaymentController {
  constructor(private readonly riderPaymentService: RiderPaymentService) {}

  @Post(':riderId/payment/:paymentId')
  async addPaymentRider(
    @Param('riderId') riderId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return await this.riderPaymentService.addPaymentRider(riderId, paymentId);
  }

  @Get(':riderId/payments/:paymentId')
  async findPaymentByRiderIdPaymentId(
    @Param('riderId') riderId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return await this.riderPaymentService.findPaymentByRiderIdPaymentId(
      riderId,
      paymentId,
    );
  }

  @Get(':riderId/payments')
  async findPaymentsByRiderId(@Param('riderId') riderId: string) {
    return await this.riderPaymentService.findPaymentsByRiderId(riderId);
  }

  @Put(':riderId/payments')
  async associatePaymentsRider(
    @Body() paymentsDto: PaymentDto[],
    @Param('riderId') riderId: string,
  ) {
    const payments = plainToInstance(PaymentEntity, paymentsDto);
    return await this.riderPaymentService.associatePaymentsRider(riderId, payments);
  }

  @Delete(':riderId/payment/:paymentId')
  @HttpCode(204)
  async deletePaymentRider(
    @Param('riderId') riderId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return await this.riderPaymentService.deletePaymentRider(riderId, paymentId);
  }
}
