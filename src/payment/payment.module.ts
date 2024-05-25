/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from './payment.entity/payment.entity';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([PaymentEntity])],

})
export class PaymentModule {}
