import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompleterItem, CompleterData, CompleterService } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RecipeService } from 'app/recipe.service';
import { Recipe } from 'app/recipe.model';
import { FoodService } from "app/food.service";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() code = 'mon';
  @Input() day = 'Понедельник';
  @ViewChild('f') foodForm: NgForm;
  isAdding: boolean = false;

  foods = [

  ];

  protected food: string;
  protected selectedColor: string;
  protected recipes: CompleterData;

  protected onSelected(item: CompleterItem) {
    this.selectedColor = item ? item.title : '';
  }

  constructor(
    completerService: CompleterService,
    private recipeService: RecipeService,
    private foodService: FoodService
  ) {
    this.foods.push(this.recipeService.getRandomRecipe());

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
  }

  ngOnInit() {
  }

  onRecipeSelected(selected: CompleterItem) {
    if (selected === null) {
      return;
    }
    const food = selected.originalObject;
    if (!this.foods.includes(food)) {
      this.foods.push(food);
      this.foodService.updateDay(this.code, this.foods);
    }
    this.isAdding = false;
  }
}
