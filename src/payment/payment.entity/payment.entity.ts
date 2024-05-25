/* eslint-disable prettier/prettier */
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  cardNumber: string;

  @Column()
  expirationDate: string;

  @Column()
  cvv: string;

  @OneToMany(() => RideEntity, ride => ride.payment)
  rides: RideEntity[];

  @ManyToOne(() => RiderEntity, rider => rider.payments)
   rider: RiderEntity;
}
