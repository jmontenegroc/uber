/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { RiderEntity } from "./rider.entity/rider.entity";

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(RiderEntity)
    private readonly riderRepository: Repository<RiderEntity>
  ) {}

  async findAll(): Promise<RiderEntity[]> {
    return await this.riderRepository.find({
      relations: ["artworks", "exhibitions"],
    });
  }

  async findOne(id: string): Promise<RiderEntity> {
    const rider: RiderEntity = await this.riderRepository.findOne({
      where: { id },
      relations: ["artworks", "exhibitions"],
    });
    if (!rider)
      throw new BusinessLogicException(
        "The rider with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return rider;
  }

  async create(rider: RiderEntity): Promise<RiderEntity> {
    return await this.riderRepository.save(rider);
  }

  async update(id: string, rider: RiderEntity): Promise<RiderEntity> {
    const persistedRider: RiderEntity = await this.riderRepository.findOne({
      where: { id },
    });
    if (!persistedRider)
      throw new BusinessLogicException(
        "The rider with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return await this.riderRepository.save({ ...persistedRider, ...rider });
  }

  async delete(id: string) {
    const rider: RiderEntity = await this.riderRepository.findOne({
      where: { id },
    });
    if (!rider)
      throw new BusinessLogicException(
        "The rider with the given id was not found",
        BusinessError.NOT_FOUND
      );

    await this.riderRepository.remove(rider);
  }
}
