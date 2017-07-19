import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompleterItem, CompleterData, CompleterService } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RecipeService } from "app/recipe.service";
import { Recipe } from "app/recipe.model";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() code = "mon";
  @Input() day = "Понедельник";
  @ViewChild('f') foodForm: NgForm;

  protected food: string;
  // protected dataService: CompleterData;
  protected selectedColor: string;
  protected recipes: CompleterData;

  protected onSelected(item: CompleterItem) {
    this.selectedColor = item ? item.title : "";
  }

  foods = [

  ]

  constructor(
    completerService: CompleterService,
    private recipeService: RecipeService
  ) {
    this.foods.push(this.recipeService.getRandomRecipe());

    this.recipes = completerService.local(
      this.recipeService.getRecipes(),
      "name",
      "name"
    );
    this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = completerService.local(
          this.recipeService.getRecipes(),
          "name",
          "name"
        );
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(f) {
    // this.foods.push(this.foodForm.value.food);
    // this.foodForm.reset();
  }

  onRecipeSelected(selected: CompleterItem) {
    if (selected === null) {
      return;
    }
    let food = selected.originalObject;
    if (!this.foods.includes(food)) {
      this.foods.push(food);
    }
  }

}
