import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderController } from './rider.controller';
import { RiderEntity } from './rider.entity/rider.entity';
import { RiderService } from './rider.service';

@Module({
  providers: [RiderService],
  controllers: [RiderController],
  imports: [TypeOrmModule.forFeature([RiderEntity])],
})
export class RiderModule {}
