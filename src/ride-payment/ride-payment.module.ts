/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { PaymentRideController } from './ride-payment.controller';
import { RidePaymentService } from './ride-payment.service';

@Module({
  providers: [RidePaymentService],
  imports: [TypeOrmModule.forFeature([RideEntity, PaymentEntity])],
  controllers: [PaymentRideController],

})
export class RidePaymentModule {}
