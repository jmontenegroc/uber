/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { RiderPaymentController } from './rider-payment.controller';
import { RiderPaymentService } from './rider-payment.service';

@Module({
  providers: [RiderPaymentService],
  controllers: [RiderPaymentController],
  imports: [TypeOrmModule.forFeature([RiderEntity, PaymentEntity])],

})
export class RiderPaymentModule {}
