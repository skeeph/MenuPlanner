import { Injectable, EventEmitter } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";
import { Http, Response } from "@angular/http";
import { NotificationsService } from "angular2-notifications";
import currentWeekNumber = require('current-week-number');


@Injectable()
export class FoodService {
  weekNum = -1;
  food = {};
  foodsChanged = new EventEmitter<void>();

  constructor(
    private recipeService: RecipeService,
    private http: Http,
    private notificationsService: NotificationsService,
  ) {
  }

  private tk: string;

  setToken(tk: string) {
    this.tk = tk;
  }
  private getCode(num?: number) {
    if (num == null) {
      num = this.weekNum;
    }
    return `food${num}`
  }

  setWeekNum() {
    this.weekNum = currentWeekNumber();
    if (this.food[this.weekNum] == null) {
      this.food[this.weekNum] = {};
    }
  }

  updateDay(code: string, food: any[]) {
    this.food[this.weekNum][code] = food;
    this.foodsChanged.emit();
  }


  saveFood() {
    // Сохранение в localstorage
    localStorage.setItem("food", JSON.stringify(this.food))
    return this.food;
  }

  loadFood() {
    // Загрузка из localStorage
    let savedfood = localStorage.getItem("food");
    if (savedfood != null) {
      this.food = JSON.parse(savedfood);
      let week = currentWeekNumber();
      if (!(week in this.food)) {
        this.food[week] = {};
      }
      return;
    }
    else {
      // Загрузка из REST
      this.loadRest().subscribe(
        (resp: Response) => {
          let respfood = resp.json()["food"]
          if (respfood != null) {
            this.food = respfood;
          } else {
            this.food = {};
          }
          respfood != null ? this.food = respfood : this.food = {};

          this.saveFood();
          this.foodsChanged.emit();
        },
        (err) => {
          this.notificationsService.error("Error", "Error while loading menu", {
            showProgressBar: true,
            timeOut: 0
          });
          console.log(Error);
        }
      );
    }

  }


  private getUrl(): string {
    return `https://pushreceiver-26e46.firebaseio.com/food.json?auth=${this.tk}`
  }

  loadRest() {
    return this.http.get(this.getUrl());
  }

  saveRest() {
    let temp = {}
    temp["food"] = this.food;

    this.http.put(this.getUrl(), temp).subscribe(
      (resp: Response) => {
        console.log(resp.json());
      }
    )
  }
  getFoodForDay(code: string) {
    let food = this.food[this.weekNum][code];
    if (food != null) {
      return food;
    } else {
      return [];
    }
  }

  generateForDay(code: string) {
    let food = [];
    for (var k = 0; k < 2; k++) {
      let recipe = this.recipeService.getRandomRecipe().uuid;
      if (!food.includes(recipe)) {
        food.push(recipe)
      } else {
        k--;
      }
    }
    this.food[this.weekNum][code] = food;
    this.foodsChanged.emit();
  }

  clearFood() {
    this.food[this.weekNum] = {}
    localStorage.removeItem(this.getCode())
    this.saveRest();
    this.foodsChanged.emit();
  }

  getProducts() {
    let result = [];
    let ingredients = [];
    let now = this.food[this.weekNum];
    let days = Object.keys(now);
    for (let dn in days) {
      let food = now[days[dn]];
      for (let i = 0; i < food.length; i++) {
        ingredients = ingredients.concat(this.recipeService.getRecipeByUUID(food[i]).ingredients)
      }
    }
    let ing_amount = {}
    //TODO: Продумать ситуацию, когда в разных рецептах 1 ингредиент имеет разные единицы измерения
    let units = {}
    for (var i = 0; i < ingredients.length; i++) {
      let ing = ingredients[i];

      if (ing_amount[ing.name] == null) {
        ing_amount[ing.name] = 0
      }

      if (units[ing.name] == null) {
        units[ing.name] = ing.unit
      }
      ing_amount[ing.name] += ing.amount;
    }

    for (var ing in ing_amount) {
      if (ing_amount.hasOwnProperty(ing)) {
        var amount = ing_amount[ing];
        result.push(`${ing} - ${amount} ${units[ing]}`);
      }
    }
    return result;
  }

  clearCache() {
    localStorage.removeItem("food");
  }
}
