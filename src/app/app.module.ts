import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";


import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './week/day/day.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";
import { AppRoutingModule } from "app/app-routing.module";
import { RecipesModule } from "app/recipes/recipes.module";
import { SharedModule } from "app/shared/shared.module";
import { HttpModule } from "@angular/http";
import { TodoistService } from "app/food/todoist.service";
import { FoodModule } from "app/food/food.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RecipesModule,
    SharedModule,
    HttpModule,
    FoodModule
  ],
  providers: [
    RecipeService,
    FoodService,
    TodoistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
