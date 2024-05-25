/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/car/car.entity/car.entity';
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [CarEntity, DriverEntity, PaymentEntity, RideEntity, RiderEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([CarEntity, DriverEntity, PaymentEntity, RideEntity, RiderEntity]),
];