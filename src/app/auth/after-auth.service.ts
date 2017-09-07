import { Injectable } from '@angular/core';
import { SettingsService } from "app/settings/settings.service";
import { FoodService } from "app/food/food.service";
import { RecipeService } from "app/recipes/recipe.service";

@Injectable()
export class AfterAuthService {

  constructor(
    private settingsService: SettingsService,
    private foodService:FoodService,
    private recipeService:RecipeService
    
  ) { }

  loadUserData(token: string) {
    this.settingsService.setToken(token)
    this.settingsService.loadSettings();

    this.foodService.setToken(token)
    this.foodService.loadFood();

    this.recipeService.setToken(token);
    this.recipeService.loadRecipes();

  }

}
