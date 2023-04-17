import { Car } from 'src/app/models/car.model';
import { CarDTO } from 'src/app/models/dto/car-dto.model';

export interface ICarManager {
  getCar(id: number): Promise<Car | undefined>;
  getCars(): Promise<Car[] | undefined>;

  createCar(car: CarDTO): Promise<void>;
  editCar(id: number, editedCar: CarDTO): Promise<void>;
  deleteCar(id: number): Promise<void>;
}
