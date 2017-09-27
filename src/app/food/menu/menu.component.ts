import { Component, OnInit } from '@angular/core';
import { FoodService } from "app/food/food.service";
import { RecipeService } from "app/recipes/recipe.service";
import { TodoistService } from "app/food/todoist.service";
import currentWeekNumber = require('current-week-number');
import { NotificationsService } from "angular2-notifications";
import { SettingsService } from "app/settings/settings.service";
import { Router } from "@angular/router";


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
    private todoistService: TodoistService,
    private notificationsService: NotificationsService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.num = this.getWeekNumber();
    // this.foodService.setWeekNum(this.num);
    this.foodService.loadFood();
  }

  private getWeekNumber(): number {
    return currentWeekNumber();;
  }

  onSaveClick() {
    this.foodService.saveFood();
    this.foodService.saveRest();
    this.notificationsService.success("Saved", "Menu was saved", {
      showProgressBar: true,
      timeOut: 0
    });
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
    if (this.settingsService.settingsCompleted()) {
      let products = this.foodService.getProducts();
      this.todoistService.saveTasks(products);
      console.log(products);
    } else {
      this.router.navigate(["/settings"]);
      this.notificationsService.warn("Bad settings", "Please set shopping list project name and Todoist API Key")
    }

  }
}
