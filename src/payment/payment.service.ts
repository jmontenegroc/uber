/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    BusinessError,
    BusinessLogicException,
} from "src/shared/errors/business-errors";
import { Repository } from "typeorm";
import { PaymentEntity } from "./payment.entity/payment.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>
  ) {}

  async findAll(): Promise<PaymentEntity[]> {
    return await this.paymentRepository.find({
      relations: ["artworks", "exhibitions"],
    });
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const payment: PaymentEntity = await this.paymentRepository.findOne({
      where: { id },
      relations: ["artworks", "exhibitions"],
    });
    if (!payment)
      throw new BusinessLogicException(
        "The payment with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return payment;
  }

  async create(payment: PaymentEntity): Promise<PaymentEntity> {
    return await this.paymentRepository.save(payment);
  }

  async update(id: string, payment: PaymentEntity): Promise<PaymentEntity> {
    const persistedPayment: PaymentEntity = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!persistedPayment)
      throw new BusinessLogicException(
        "The payment with the given id was not found",
        BusinessError.NOT_FOUND
      );

    return await this.paymentRepository.save({ ...persistedPayment, ...payment });
  }

  async delete(id: string) {
    const payment: PaymentEntity = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!payment)
      throw new BusinessLogicException(
        "The payment with the given id was not found",
        BusinessError.NOT_FOUND
      );

    await this.paymentRepository.remove(payment);
  }
}
