import { Component, OnInit } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.foodService.setWeekNum();
  }

  constructor(
    private recipeService: RecipeService,
    private foodService: FoodService,
    private authService: AuthService,
  ) {
    if (this.authService.isAuthed()) {
      this.recipeService.loadRecipes();
      this.foodService.loadFood();
    }

  }
  title = 'app';
}
