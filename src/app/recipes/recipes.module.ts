import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from "app/recipes/recipes-routing.module";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecipesComponent, 
    RecipeListComponent, 
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDetailComponent]
})
export class RecipesModule { }
