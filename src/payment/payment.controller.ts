/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PaymentDto } from './payment.dto/payment.dto';
import { PaymentEntity } from './payment.entity/payment.entity';
import { PaymentService } from './payment.service';


@Controller('payments')
@UseInterceptors(BusinessErrorsInterceptor)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get(':paymentId')
  async findOne(@Param('paymentId') paymentId: string) {
    return await this.paymentService.findOne(paymentId);
  }

  @Post()
  async create(@Body() paymentDto: PaymentDto) {
    const payment: PaymentEntity = plainToInstance(PaymentEntity, paymentDto);
    return await this.paymentService.create(payment);
  }

  @Put(':paymentId')
  async update(@Param('paymentId') paymentId: string, @Body() paymentDto: PaymentDto) {
    const payment: PaymentEntity = plainToInstance(PaymentEntity, paymentDto);
    return await this.paymentService.update(paymentId, payment);
  }

  @Delete(':paymentId')
  @HttpCode(204)
  async delete(@Param('paymentId') paymentId: string) {
    return await this.paymentService.delete(paymentId);
  }
}