/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/payment/payment.entity/payment.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RidePaymentService {
   constructor(
       @InjectRepository(PaymentEntity)
       private readonly paymentRepository: Repository<PaymentEntity>,
   
       @InjectRepository(RideEntity)
       private readonly rideRepository: Repository<RideEntity>
   ) {}

   async addRidePayment(paymentId: string, rideId: string): Promise<PaymentEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND);
     
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}, relations: ["rides", "exhibitions"]})
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND);
   
       payment.rides = [...payment.rides, ride];
       return await this.paymentRepository.save(payment);
     }
   
   async findRideByPaymentIdRideId(paymentId: string, rideId: string): Promise<RideEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
      
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}, relations: ["rides"]});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
  
       const paymentRide: RideEntity = payment.rides.find(e => e.id === ride.id);
  
       if (!paymentRide)
         throw new BusinessLogicException("The ride with the given id is not associated to the payment", BusinessError.PRECONDITION_FAILED)
  
       return paymentRide;
   }
   
   async findRidesByPaymentId(paymentId: string): Promise<RideEntity[]> {
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}, relations: ["rides"]});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
      
       return payment.rides;
   }
   
   async associateRidesPayment(paymentId: string, rides: RideEntity[]): Promise<PaymentEntity> {
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}, relations: ["rides"]});
   
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < rides.length; i++) {
         const ride: RideEntity = await this.rideRepository.findOne({where: {id: rides[i].id}});
         if (!ride)
           throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       payment.rides = rides;
       return await this.paymentRepository.save(payment);
     }
   
   async deleteRidePayment(paymentId: string, rideId: string){
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
   
       const payment: PaymentEntity = await this.paymentRepository.findOne({where: {id: paymentId}, relations: ["rides"]});
       if (!payment)
         throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND)
   
       const paymentRide: RideEntity = payment.rides.find(e => e.id === ride.id);
   
       if (!paymentRide)
           throw new BusinessLogicException("The ride with the given id is not associated to the payment", BusinessError.PRECONDITION_FAILED)

       payment.rides = payment.rides.filter(e => e.id !== rideId);
       await this.paymentRepository.save(payment);
   }  
}