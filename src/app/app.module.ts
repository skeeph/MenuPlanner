import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";


import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './week/day/day.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from "app/recipe.service";
import { FoodService } from "app/food.service";


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
    Ng2CompleterModule
  ],
  providers: [
    RecipeService,
    FoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
