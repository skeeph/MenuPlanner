import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";
import { Http, Response } from "@angular/http";
import { NotificationsService } from "angular2-notifications";

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
    this.notificationsService.success("Success", "Recipe added", {
      showProgressBar: true,
      timeOut: 0
    });
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
    this.notificationsService.success("Updated", "Recipe updated", {
      showProgressBar: true,
      timeOut: 0
    });
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
    this.notificationsService.warn("Deleted", "Recipe was deleted", {
      showProgressBar: true,
      timeOut: 0
    });
  }

  saveRecipes() {
    localStorage.setItem(this.getCode(), JSON.stringify(this.recipes))

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
        console.log(recipes);

        this.recipes = recipes;
        this.recipesChanges.next(this.recipes.slice());
        this.saveRecipes();
      }
    )
  }


  constructor(
    private http: Http,
    private notificationsService: NotificationsService,
  ) { }

  private url = "https://pushreceiver-26e46.firebaseio.com/recipes.json";
  private token: string;

  setToken(tk:string){
    this.token = tk;
  }

  private getUrl(): string {
    return `${this.url}?auth=${this.token}`
  }
  
  saveRecipesRest() {
    return this.http.put(this.getUrl(), this.recipes)
  }

  private loadRecipesRest() {
    return this.http.get(this.getUrl())
      .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json()
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
  }
}
