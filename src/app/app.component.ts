import { Component, OnInit } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.recipeService.loadRecipes();
    this.foodService.setWeekNum()
  }

  constructor(
    private recipeService: RecipeService,
    private foodService:FoodService
  ) {

  }
  title = 'app';
}
