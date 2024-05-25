/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { RiderEntity } from 'src/rider/rider.entity/rider.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RiderRideService {
   constructor(
       @InjectRepository(RiderEntity)
       private readonly riderRepository: Repository<RiderEntity>,
   
       @InjectRepository(RideEntity)
       private readonly rideRepository: Repository<RideEntity>
   ) {}

   async addRideRider(riderId: string, rideId: string): Promise<RiderEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND);
     
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["rides", "exhibitions"]})
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND);
   
       rider.rides = [...rider.rides, ride];
       return await this.riderRepository.save(rider);
     }
   
   async findRideByRiderIdRideId(riderId: string, rideId: string): Promise<RideEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
      
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["rides"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
  
       const riderRide: RideEntity = rider.rides.find(e => e.id === ride.id);
  
       if (!riderRide)
         throw new BusinessLogicException("The ride with the given id is not associated to the rider", BusinessError.PRECONDITION_FAILED)
  
       return riderRide;
   }
   
   async findRidesByRiderId(riderId: string): Promise<RideEntity[]> {
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["rides"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
      
       return rider.rides;
   }
   
   async associateRidesRider(riderId: string, rides: RideEntity[]): Promise<RiderEntity> {
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["rides"]});
   
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < rides.length; i++) {
         const ride: RideEntity = await this.rideRepository.findOne({where: {id: rides[i].id}});
         if (!ride)
           throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       rider.rides = rides;
       return await this.riderRepository.save(rider);
     }
   
   async deleteRideRider(riderId: string, rideId: string){
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
   
       const rider: RiderEntity = await this.riderRepository.findOne({where: {id: riderId}, relations: ["rides"]});
       if (!rider)
         throw new BusinessLogicException("The rider with the given id was not found", BusinessError.NOT_FOUND)
   
       const riderRide: RideEntity = rider.rides.find(e => e.id === ride.id);
   
       if (!riderRide)
           throw new BusinessLogicException("The ride with the given id is not associated to the rider", BusinessError.PRECONDITION_FAILED)

       rider.rides = rider.rides.filter(e => e.id !== rideId);
       await this.riderRepository.save(rider);
   }  
}