import { Component, OnInit } from '@angular/core';
import { FoodService } from "app/food.service";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  dayNames = {
    "mon": "Понедельник",
    "tue": "Вторник",
    "wed": "Среда",
    "thu": "Четверг",
    "fri": "Пятница",
    "sat": "Суббота",
    "sun": "Воскресенье"
  };
  num = -1;

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.num = this.getWeekNumber();
    this.foodService.setWeekNum(this.num);
    this.foodService.loadFood();
  }

  private getWeekNumber(): number {
    return -12;
  }

  onSaveClick(){
    this.foodService.saveFood();
    
  }

}
