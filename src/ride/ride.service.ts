/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { RideEntity } from "./ride.entity/ride.entity";

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(RideEntity)
    private readonly rideRepository: Repository<RideEntity>
  ) {}

  async findAll(): Promise<RideEntity[]> {
    return await this.rideRepository.find({
      relations: ["artworks", "exhibitions"],
    });
  }

  async findOne(id: string): Promise<RideEntity> {
    const ride: RideEntity = await this.rideRepository.findOne({
      where: { id },
      relations: ["artworks", "exhibitions"],
    });
    if (!ride)
      throw new BusinessLogicException(
        "The ride with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return ride;
  }

  async create(ride: RideEntity): Promise<RideEntity> {
    return await this.rideRepository.save(ride);
  }

  async update(id: string, ride: RideEntity): Promise<RideEntity> {
    const persistedRide: RideEntity = await this.rideRepository.findOne({
      where: { id },
    });
    if (!persistedRide)
      throw new BusinessLogicException(
        "The ride with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return await this.rideRepository.save({ ...persistedRide, ...ride });
  }

  async delete(id: string) {
    const ride: RideEntity = await this.rideRepository.findOne({
      where: { id },
    });
    if (!ride)
      throw new BusinessLogicException(
        "The ride with the given id was not found",
        BusinessError.NOT_FOUND
      );

    await this.rideRepository.remove(ride);
  }
}
