import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
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

  getRecipeByUUID(uuid: string) {
    for (var i = 0; i < this.recipes.length; i++) {
      var recipe = this.recipes[i];
      if (recipe.uuid === uuid) {
        return recipe;
      }
    }
    return null;
  }

  getRandomRecipe() {
    let randind = Math.floor(Math.random() * this.recipes.length);
    return this.recipes[randind];
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

  private url = "http://localhost:8000/api/v1/recipes/";
  private tk: string = null;

  setToken(tk: string) {
    this.tk = tk;
  }

  private getUrl(): string {
    return `${this.url}`
  }

  private getAuthHeader() {
    if (this.tk===null) {
      this.tk = localStorage.getItem("token");
    }
    let headers = new Headers();
    headers.append('Authorization', `Token ${this.tk}`);
    return new RequestOptions({ headers: headers });
  }

  saveRecipesRest() {
    // TODO: Bulk save
    for (var rn in this.recipes) {
      let recipe = this.recipes[rn];
      this.http.post(this.getUrl(), recipe, this.getAuthHeader()).subscribe(
        (response) => { console.log(response); },
        (err) => {
          console.log(err);
          // this.notificationsService.error("Error", "Error while saving recipes to REST", {
          //   showProgressBar: true,
          //   timeOut: 0
          // });
        }
      );
      // this.notificationsService.success("Saved", "Recipes saved", {
      //   showProgressBar: true,
      //   timeOut: 0
      // });
    }

  }

  private loadRecipesRest() {
    return this.http.get(this.getUrl(), this.getAuthHeader())
      .map(
      (response: Response) => {
        const js = response.json();
        const recipes: Recipe[] = js['results'];
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
  }

  clearCache() {
    localStorage.removeItem(this.getCode());
  }
}
