import { Component, OnInit } from '@angular/core';
import { FoodService } from "app/food.service";
import { RecipeService } from "app/recipes/recipe.service";

import currentWeekNumber = require('current-week-number');
import { TodoistService } from "app/todoist.service";

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
    private foodService: FoodService,
    private recipeService: RecipeService,
    private todoistService: TodoistService
  ) { }

  ngOnInit() {
    this.recipeService.loadRecipes();
    this.num = this.getWeekNumber();
    this.foodService.setWeekNum(this.num);
    this.foodService.loadFood();
  }

  private getWeekNumber(): number {
    return currentWeekNumber();;
  }

  onSaveClick() {
    this.foodService.saveFood();
  }

  onGenerate() {
    for (var code in this.days) {
      if (this.days.hasOwnProperty(code)) {
        var element = this.days[code];
        this.foodService.generateForDay(element)
      }
    }
    this.foodService.saveFood();
  }

  onClear() {
    this.foodService.clearFood();
  }

  onShoppingClick() {
    let products = this.foodService.getProducts();
    this.todoistService.saveTasks(products);
  }

}
