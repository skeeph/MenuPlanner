import { Component, OnInit } from '@angular/core';
import { FoodService } from "app/food/food.service";
import { RecipeService } from "app/recipes/recipe.service";
import { TodoistService } from "app/food/todoist.service";
import currentWeekNumber = require('current-week-number');


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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
    console.log(this.todoistService.getProjectId());
  }

  onClear() {
    this.foodService.clearFood();
  }

  onShoppingClick() {
    let products = this.foodService.getProducts();
    this.todoistService.saveTasks(products);
  }
}
