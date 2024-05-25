/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from 'src/driver/driver.entity/driver.entity';
import { RideEntity } from 'src/ride/ride.entity/ride.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class DriverRideService {
   constructor(
       @InjectRepository(DriverEntity)
       private readonly driverRepository: Repository<DriverEntity>,
   
       @InjectRepository(RideEntity)
       private readonly rideRepository: Repository<RideEntity>
   ) {}

   async addRideDriver(driverId: string, rideId: string): Promise<DriverEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND);
     
       const driver: DriverEntity = await this.driverRepository.findOne({where: {id: driverId}, relations: ["rides", "exhibitions"]})
       if (!driver)
         throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND);
   
       driver.rides = [...driver.rides, ride];
       return await this.driverRepository.save(driver);
     }
   
   async findRideByDriverIdRideId(driverId: string, rideId: string): Promise<RideEntity> {
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
      
       const driver: DriverEntity = await this.driverRepository.findOne({where: {id: driverId}, relations: ["rides"]});
       if (!driver)
         throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
  
       const driverRide: RideEntity = driver.rides.find(e => e.id === ride.id);
  
       if (!driverRide)
         throw new BusinessLogicException("The ride with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)
  
       return driverRide;
   }
   
   async findRidesByDriverId(driverId: string): Promise<RideEntity[]> {
       const driver: DriverEntity = await this.driverRepository.findOne({where: {id: driverId}, relations: ["rides"]});
       if (!driver)
         throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
      
       return driver.rides;
   }
   
   async associateRidesDriver(driverId: string, rides: RideEntity[]): Promise<DriverEntity> {
       const driver: DriverEntity = await this.driverRepository.findOne({where: {id: driverId}, relations: ["rides"]});
   
       if (!driver)
         throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < rides.length; i++) {
         const ride: RideEntity = await this.rideRepository.findOne({where: {id: rides[i].id}});
         if (!ride)
           throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       driver.rides = rides;
       return await this.driverRepository.save(driver);
     }
   
   async deleteRideDriver(driverId: string, rideId: string){
       const ride: RideEntity = await this.rideRepository.findOne({where: {id: rideId}});
       if (!ride)
         throw new BusinessLogicException("The ride with the given id was not found", BusinessError.NOT_FOUND)
   
       const driver: DriverEntity = await this.driverRepository.findOne({where: {id: driverId}, relations: ["rides"]});
       if (!driver)
         throw new BusinessLogicException("The driver with the given id was not found", BusinessError.NOT_FOUND)
   
       const driverRide: RideEntity = driver.rides.find(e => e.id === ride.id);
   
       if (!driverRide)
           throw new BusinessLogicException("The ride with the given id is not associated to the driver", BusinessError.PRECONDITION_FAILED)

       driver.rides = driver.rides.filter(e => e.id !== rideId);
       await this.driverRepository.save(driver);
   }  
}