/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RiderPaymentService {
   constructor(
       @InjectRepository(RiderEntity)
       private readonly riderRepository: Repository<RiderEntity>,
   
       @InjectRepository(PaymentEntity)
       private readonly paymentRepository: Repository<PaymentEntity>
   ) {}

   async addPaymentRider(riderId: string, paymentId: string): Promise<RiderEntity> {
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND);
     
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["payments", "exhibitions"]})
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND);
   
       rider.payments = [...rider.payments, payment];
       return await this.riderRepository.save(rider);
     }
   
   async findPaymentByRiderIdPaymentId(riderId: string, paymentId: string): Promise<PaymentEntity> {
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
      
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["payments"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
  
       const riderPayment: PaymentEntity = rider.payments.find(e => e.id === payment.id);
  
       if (!riderPayment)
         throw new BusinessLogicException("The payment with the given id is not associated to the rider", BusinessError.PRECONDITION_FAILED)
  
       return riderPayment;
   }
   
   async findPaymentsByRiderId(riderId: string): Promise<PaymentEntity[]> {
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["payments"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
      
       return rider.payments;
   }
   
   async associatePaymentsRider(riderId: string, payments: PaymentEntity[]): Promise<RiderEntity> {
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["payments"]});
   
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < payments.length; i++) {
         const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: payments[i].id}});
         if (!payment)
           throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       rider.payments = payments;
       return await this.riderRepository.save(rider);
     }
   
   async deletePaymentRider(riderId: string, paymentId: string){
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
   
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["payments"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
   
       const riderPayment: PaymentEntity = rider.payments.find(e => e.id === payment.id);
   
       if (!riderPayment)
           throw new BusinessLogicException("The payment with the given id is not associated to the rider", BusinessError.PRECONDITION_FAILED)

       rider.payments = rider.payments.filter(e => e.id !== paymentId);
       await this.riderRepository.save(rider);
   }  
}