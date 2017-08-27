import { Injectable, EventEmitter } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";

@Injectable()
export class FoodService {
  // TODO: Сохранять не полностью рецепты, а идентификаторы на них
  weekNum = -1;
  food = {};
  foodsChanged = new EventEmitter<void>();

  constructor(
    private recipeService: RecipeService,
  ) {
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
    this.foodsChanged.emit();
  }


  saveFood() {
    // Сохранение в localstorage
    localStorage.setItem(this.getCode(), JSON.stringify(this.food[this.weekNum]))
    // TODO: Сохранение в REST?
    return this.food;
  }

  loadFood() {
    // Загрузка из localStorage
    let savedfood = localStorage.getItem(this.getCode());
    if (savedfood != null) {
      this.food[this.weekNum] = JSON.parse(savedfood);
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

  generateForDay(code: string) {
    let food = [];
    for (var k = 0; k < 2; k++) {
      let recipe = this.recipeService.getRandomRecipe();
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
        ingredients = ingredients.concat(food[i].ingredients)
      }
    }
    for (var i = 0; i < ingredients.length; i++) {
      let ing = ingredients[i];
      result.push(`${ing.name} - ${ing.amount} ${ing.unit}`);
    }
    return result;
  }

}
