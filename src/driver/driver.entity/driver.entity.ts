/* eslint-disable prettier/prettier */
import { CarEntity } from 'src/car/car.entity/car.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => CarEntity, (car) => car.driver)
  car: CarEntity;

  @OneToMany(() => RideEntity, (ride) => ride.driver)
  rides: RideEntity[];
}
