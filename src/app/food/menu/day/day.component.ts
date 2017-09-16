import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CompleterData, CompleterItem, CompleterService } from "ng2-completer";
import { NgForm } from "@angular/forms";
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";
import { Recipe } from "app/recipes/recipe.model";

@Component({
  selector: 'menu-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() code = 'mon';
  @Input() day = 'Понедельник';

  protected food: string;
  protected selectedColor: string;
  protected recipes: CompleterData;

  @ViewChild('f') foodForm: NgForm;
  isAdding: boolean = false;

  foods = [

  ];

  food_ids = [];

  protected onSelected(item: CompleterItem) {
    this.selectedColor = item ? item.title : '';
  }

  constructor(
    completerService: CompleterService,
    private recipeService: RecipeService,
    private foodService: FoodService
  ) {
    this.recipes = completerService.local(
      this.recipeService.getRecipes(),
      'name',
      'name'
    );

    //При добавлении изменении списка рецептов, изменить автодополнение
    this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = completerService.local(
          this.recipeService.getRecipes(),
          'name',
          'name'
        );
      }
    );

    this.foodService.foodsChanged.subscribe(
      () => {
        this.food_ids = this.foodService.getFoodForDay(this.code);
      }
    );
  }

  ngOnInit() {
    this.food_ids = this.foodService.getFoodForDay(this.code);
  }

  onRecipeSelected(selected: CompleterItem) {
    if (selected === null) {
      return;
    }
    const food = selected.originalObject;
    if (!this.food_ids.includes(food.uuid)) {
      this.food_ids.push(food.uuid);
      this.foodService.updateDay(this.code, this.food_ids);
    }
    this.isAdding = false;
  }

  getName(uuid:string){
    return this.recipeService.getRecipeByUUID(uuid).name;
  }

  deleteFood(i) {
    this.food_ids.splice(i, 1);
    this.foodService.updateDay(this.code, this.food_ids);
  }

  randomFood(i) {
    this.food_ids[i] = this.recipeService.getRandomRecipe().uuid;
    this.foodService.updateDay(this.code, this.food_ids);
  }

}
