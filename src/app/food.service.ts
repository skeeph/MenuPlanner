import { Injectable } from '@angular/core';

@Injectable()
export class FoodService {
  // TODO: Сохранять не полностью рецепты, а идентификаторы на них
  weekNum = -1;
  food = {};

  constructor() {
  }

  private getCode() {
    return `food${this.weekNum}`
  }

  setWeekNum(num: number) {
    this.weekNum = num;
    this.food[this.weekNum] = {};
  }

  updateDay(code: string, food: any[]) {
    this.food[this.weekNum][code] = food;
  }


  saveFood() {
    // Сохранение в localstorage
    localStorage.setItem(this.getCode(), JSON.stringify(this.food))
    // TODO: Сохранение в REST?
    return this.food;
  }

  loadFood() {
    // Загрузка из localStorage
    let savedfood = localStorage.getItem(this.getCode());
    if (savedfood != null) {
      this.food = JSON.parse(savedfood);
      return;
    }
    // TODO: Загрузка из REST
  }


  getFoodForDay(code: string) {
    let food = this.food[this.weekNum][code];
    if (food != null) {
      return food;
    } else {
      return [];
    }
  }
}
