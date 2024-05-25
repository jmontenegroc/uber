/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './driver.controller';
import { DriverEntity } from './driver.entity/driver.entity';
import { DriverService } from './driver.service';

@Module({
  providers: [DriverService],
  controllers: [DriverController],
  imports: [TypeOrmModule.forFeature([DriverEntity])],

})
export class DriverModule {}
