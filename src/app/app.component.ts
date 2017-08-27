import { Component, OnInit } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.recipeService.loadRecipes();
  }

  constructor(private recipeService: RecipeService) {

  }
  title = 'app';
}
