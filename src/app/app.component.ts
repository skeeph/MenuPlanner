import { Component, OnInit } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.recipeService.loadRecipes();
    this.foodService.setWeekNum();

    firebase.initializeApp({
      apiKey: "AIzaSyDMFRAIxjclUZ-gBzscoh988mA9PwlzRKQ",
      authDomain: "pushreceiver-26e46.firebaseapp.com",
    });
  }

  constructor(
    private recipeService: RecipeService,
    private foodService:FoodService
  ) {

  }
  title = 'app';
}
