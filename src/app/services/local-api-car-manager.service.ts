import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Car } from '../models/car.model';
import { ICarManager } from './abstractions/i-car-manager.interface';
import { HttpService } from './http-service.service';
import { map, firstValueFrom } from 'rxjs';
import { CarDTO } from '../models/dto/car-dto.model';

@Injectable({ providedIn: 'root' })
export class LocalApiCarManager implements ICarManager {
  private readonly apiUrl: URL = new URL(
    `http://${environment.carApi.host}:${environment.carApi.port}/cars`
  );

  constructor(private httpService: HttpService) {}

  private mapCar(car: any): Car {
    return new Car(car.Id, car.Model, car.Manufacturer, car.Price, car.Year);
  }

  async getCar(id: number): Promise<Car | undefined> {
    const car$ = this.httpService
      .get<Car>(this.apiUrl, { id: id })
      .pipe(map(this.mapCar));

    return await firstValueFrom(car$);
  }

  async getCars(): Promise<Car[] | undefined> {
    const cars$ = this.httpService
      .get<Car[]>(this.apiUrl)
      .pipe(map((cars: any[]) => cars.map(this.mapCar)));

    return await firstValueFrom(cars$);
  }

  async createCar(car: CarDTO): Promise<void> {
    const result$ = this.httpService.post<void>(this.apiUrl, car);

    return await firstValueFrom(result$);
  }

  async editCar(id: number, editedCar: CarDTO): Promise<void> {
    const result$ = this.httpService.put<void>(this.apiUrl, {
      id,
      ...editedCar,
    });

    return await firstValueFrom(result$);
  }

  async deleteCar(id: number): Promise<void> {
    const result$ = this.httpService.delete<void>(this.apiUrl, { id });

    return await firstValueFrom(result$);
  }
}
