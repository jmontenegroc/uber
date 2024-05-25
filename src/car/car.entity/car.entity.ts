/* eslint-disable prettier/prettier */

import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: number;

  @Column()
  licensePlate: string;

  @Column()
  seats: number;

  @OneToOne(() => DriverEntity, (driver) => driver.car)
  driver: DriverEntity;
}
