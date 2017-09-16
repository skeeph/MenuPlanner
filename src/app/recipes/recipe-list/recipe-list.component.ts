import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from "app/recipes/recipe.service";
import { Subscription } from "rxjs/Subscription";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  r: Recipe;
  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.r = this.recipes[0];
    this.subscription = this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveRecipes() {
    this.recipeService.saveRecipes();
    this.recipeService.saveRecipesRest();
    // FIXME: При сохранении нескольких вернуть все как было
    // .subscribe(
    //   (response) => { console.log(response); },
    //   (err) => {
    //     console.log(err);
    //     this.notificationsService.error("Error", "Error while saving recipes to REST", {
    //       showProgressBar: true,
    //       timeOut: 0
    //     });
    //   }
    // );
    // this.notificationsService.success("Saved", "Recipes saved", {
    //   showProgressBar: true,
    //   timeOut: 0
    // });;
  }

}
