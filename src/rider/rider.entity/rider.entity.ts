/* eslint-disable prettier/prettier */
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RiderEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => RideEntity, (ride) => ride.rider)
  rides: RideEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.rider)
  payments: PaymentEntity[];
}
