import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from "app/recipes/recipes-routing.module";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  declarations: [
    RecipesComponent, 
    RecipeListComponent, 
    RecipeItemComponent,
    RecipeStartComponent]
})
export class RecipesModule { }
