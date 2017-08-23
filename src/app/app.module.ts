import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";


import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './week/day/day.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food.service";
import { AppRoutingModule } from "app/app-routing.module";
import { RecipesModule } from "app/recipes/recipes.module";


@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    DayComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2CompleterModule,
    AppRoutingModule,
    RecipesModule
  ],
  providers: [
    RecipeService,
    FoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
