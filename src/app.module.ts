/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarEntity } from './car/car.entity/car.entity';
import { CarModule } from './car/car.module';
import { DriverCarModule } from './driver-car/driver-car.module';
import { DriverRideModule } from './driver-ride/driver-ride.module';
import { DriverEntity } from './driver/driver.entity/driver.entity';
import { DriverModule } from './driver/driver.module';
import { PaymentEntity } from './payment/payment.entity/payment.entity';
import { PaymentModule } from './payment/payment.module';
import { RidePaymentModule } from './ride-payment/ride-payment.module';
import { RideEntity } from './ride/ride.entity/ride.entity';
import { RideModule } from './ride/ride.module';
import { RiderPaymentModule } from './rider-payment/rider-payment.module';
import { RiderRideModule } from './rider-ride/rider-ride.module';
import { RiderEntity } from './rider/rider.entity/rider.entity';
import { RiderModule } from './rider/rider.module';

@Module({
  imports: [
    DriverModule,
    RiderModule,
    RideModule,
    PaymentModule,
    CarModule,
    RiderPaymentModule,
    RiderRideModule,
    RidePaymentModule,
    DriverRideModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [
        DriverEntity,
        RiderEntity,
        RiderEntity,
        RideEntity,
        PaymentEntity,
        CarEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    RiderRideModule,
    DriverRideModule,
    RiderPaymentModule,
    RidePaymentModule,
    DriverCarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
