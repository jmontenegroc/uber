/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { CarEntity } from "./car.entity/car.entity";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly CarRepository: Repository<CarEntity>
  ) {}

  async findAll(): Promise<CarEntity[]> {
    return await this.CarRepository.find({
      relations: ["driver"],
    });
  }

  async findOne(id: string): Promise<CarEntity> {
    const Car: CarEntity = await this.CarRepository.findOne({
      where: { id },
      relations: ["driver"],
    });
    if (!Car)
      throw new BusinessLogicException(
        "The Car with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return Car;
  }

  async create(Car: CarEntity): Promise<CarEntity> {
    return await this.CarRepository.save(Car);
  }

  async update(id: string, Car: CarEntity): Promise<CarEntity> {
    const persistedCar: CarEntity = await this.CarRepository.findOne({
      where: { id },
    });
    if (!persistedCar)
      throw new BusinessLogicException(
        "The Car with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return await this.CarRepository.save({ ...persistedCar, ...Car });
  }

  async delete(id: string) {
    const Car: CarEntity = await this.CarRepository.findOne({
      where: { id },
    });
    if (!Car)
      throw new BusinessLogicException(
        "The Car with the given id was not found",
        BusinessError.NOT_FOUND
      );

    await this.CarRepository.remove(Car);
  }
}
