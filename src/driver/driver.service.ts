/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  BusinessError,
  BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { DriverEntity } from "./driver.entity/driver.entity";

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>
  ) {}

  async findAll(): Promise<DriverEntity[]> {
    return await this.driverRepository.find({
      relations: ["car", "rides"],
    });
  }

  async findOne(id: string): Promise<DriverEntity> {
    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id },
      relations: ["car", "rides"],
    });
    if (!driver)
      throw new BusinessLogicException(
        "The driver with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return driver;
  }

  async create(driver: DriverEntity): Promise<DriverEntity> {
    return await this.driverRepository.save(driver);
  }

  async update(id: string, driver: DriverEntity): Promise<DriverEntity> {
    const persistedDriver: DriverEntity = await this.driverRepository.findOne({
      where: { id },
    });
    if (!persistedDriver)
      throw new BusinessLogicException(
        "The driver with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return await this.driverRepository.save({ ...persistedDriver, ...driver });
  }

  async delete(id: string) {
    const driver: DriverEntity = await this.driverRepository.findOne({
      where: { id },
    });
    if (!driver)
      throw new BusinessLogicException(
        "The driver with the given id was not found",
        BusinessError.NOT_FOUND
      );

    await this.driverRepository.remove(driver);
  }
}
