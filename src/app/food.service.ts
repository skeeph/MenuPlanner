import { Injectable } from '@angular/core';

@Injectable()
export class FoodService {
  weekNum = -1; //TODO Исправить этот Хардкод
  food = {};

  constructor() {
    this.food[this.weekNum] = {};
  }

  updateDay(code: string, food: any[]) {
    this.food[this.weekNum][code] = food;
  }

  

}
