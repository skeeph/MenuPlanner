import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Product } from "app/product.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe("Плов",
      "http://ist.say7.info/img0001/18/118_0134bxr_2961_6hi.jpg",
      [
        { name:"Рис", amount: 150, unit: "g" },
        { name:"Морковь", amount: 50, unit: "шт" },
      ],
      "Плов — составное блюдо в основном из риса и, как правило, мяса или рыбы, однако и здесь бывают исключения"),

    new Recipe("Стейк",
      "http://delikates.me/wp-content/uploads/2017/04/D09FD180D0B8D0B3D0BED182D0BED0B2D0BBD0B5D0BDD0B8D0B5_D181D182D0B5D0B9D0BAD0B0.jpg",
      [
        { name:"Говядина вырезка", amount: 300, unit: "g" },
        { name:"Соль", amount: 5, unit: "g" },
      ],
      "Стейк — толстый кусок обжаренного мяса. Стейк из лучших частей говядины обычно называется просто стейком"),

    new Recipe("Ризотто",
      "http://www.iamcook.ru/upl/recipes/misc/cc6ae4c89e9308e1f01661e7eaf87dfe.JPG",
      [

      ],
      "распространённое блюдо из риса в Северной Италии. Первое письменное упоминание о нём встречается только в XIX веке")
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRandomRecipe() {
    return this.recipes[Math.floor(Math.random() * this.recipes.length)];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deletRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }


  constructor() { }

}
