import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Product } from "app/product.model";
import { Subject } from "rxjs";
import { Http, Response } from "@angular/http";

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  private getCode() {
    return "recipes";
  }


  recipes: Recipe[] = [];

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
    recipe.generateId();
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }

  saveRecipes() {
    localStorage.setItem(this.getCode(), JSON.stringify(this.recipes))
    this.saveRecipesRest().subscribe(
      (response: Response) => { console.log(response); }
    );;

  }

  loadRecipes() {
    // Загрузка из localStorage
    let saveRecipes = localStorage.getItem(this.getCode());
    if (saveRecipes != null) {
      this.recipes = JSON.parse(saveRecipes);
      return;
    }
    let resp = this.loadRecipesRest();
    resp.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChanges.next(this.recipes.slice());
        this.saveRecipes();
      }
    )
  }


  constructor(
    private http: Http
  ) { }

  private url = "http://localhost:5000/recipes"
  private saveRecipesRest() {
    console.log(this.url);
    return this.http.post(this.url, this.recipes)
  }

  private loadRecipesRest() {
    return this.http.get(this.url)
      .map(res => res.json());
  }
}
