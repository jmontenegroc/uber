/* eslint-disable prettier/prettier */
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RideEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column()
  fare: number;

  @ManyToOne(() => DriverEntity, (driver) => driver.rides)
  driver: DriverEntity;

  @ManyToOne(() => RiderEntity, (rider) => rider.rides)
  rider: RiderEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.rides)
  payment: PaymentEntity;
}
