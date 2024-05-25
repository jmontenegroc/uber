/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/car/car.entity/car.entity';
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { Repository } from 'typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class DriverCarService {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,

    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async addCarDriver(driverId: string, carId: string): Promise<DriverEntity> {
    const car: CarEntity = await this.carRepository.findOne({
      where: { id: carId },
    });
    if (!car)
      throw new BusinessLogicException(
        'The car with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id: driverId },
    });
    if (!driver)
      throw new BusinessLogicException(
        'The driver with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    driver.car = car;
    return await this.driverRepository.save(driver);
  }

  async findCarByDriverId(driverId: string): Promise<CarEntity> {
    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: ['car'],
    });
    if (!driver)
      throw new BusinessLogicException(
        'The driver with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return driver.car;
  }

  async associateCarsDriver(
    driverId: string,
    carId: string,
  ): Promise<DriverEntity> {
    const car: CarEntity = await this.carRepository.findOne({
      where: { id: carId },
    });
    if (!car)
      throw new BusinessLogicException(
        'The car with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id: driverId },
    });
    if (!driver)
      throw new BusinessLogicException(
        'The driver with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    driver.car = car;
    return await this.driverRepository.save(driver);
  }

  async deleteCarDriver(driverId: string, carId: string) {
    const car: CarEntity = await this.carRepository.findOne({
      where: { id: carId },
    });
    if (!car)
      throw new BusinessLogicException(
        'The car with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: ['car'],
    });
    if (!driver)
      throw new BusinessLogicException(
        'The driver with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (!driver.car || driver.car.id !== car.id)
      throw new BusinessLogicException(
        'The car with the given id is not associated to the driver',
        BusinessError.PRECONDITION_FAILED,
      );

    driver.car = null;
    await this.driverRepository.save(driver);
  }
}
