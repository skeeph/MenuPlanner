import { Injectable } from '@angular/core';

@Injectable()
export class FoodService {
  weekNum = -1; //TODO Исправить этот Хардкод
  food = {};

  constructor() {
  }

  private getCode(){
    return `food${this.weekNum}`
  }

  setWeekNum(num:number){
    this.weekNum = num;
    this.food[this.weekNum] = {};
  }

  updateDay(code: string, food: any[]) {
    this.food[this.weekNum][code] = food;
  }
  

  // TODO: После реализации сохранения данных, также нам необходимо реализовать загрузку сохраненных ранее данных
  saveFood(){
    // Сохранение в localstorage?
    localStorage.setItem(this.getCode(), JSON.stringify(this.food))
    // Сохранение в REST?
    return this.food;
  }

  loadFood(){
    
    let savedfood = localStorage.getItem(this.getCode());
    if (savedfood!=null) {
      this.food = savedfood;
    } else {
      // TODO: Загрузка из REST
    }
  }

}
