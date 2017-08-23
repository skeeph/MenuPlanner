import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from "app/recipe.model";
import { Product } from "app/product.model";

@Injectable()
export class RecipeService {
  recipesChanges = new EventEmitter<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe("Плов", [
      { product: new Product("Рис"), quantity: 150 },
      { product: new Product("Морковь"), quantity: 50 },
    ]),

    new Recipe("Стейк", [
      { product: new Product("Говядина вырезка"), quantity: 300 },
      { product: new Product("Соль"), quantity: 5 },
    ]),
     
    new Recipe("Ризотто", [
      
    ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRandomRecipe() {
    return this.recipes[Math.floor(Math.random() * this.recipes.length)];
  }


  constructor() { }

}
