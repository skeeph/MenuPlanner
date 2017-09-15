import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from "app/recipes/recipe.service";
import { FoodService } from "app/food/food.service";
import { AppRoutingModule } from "app/app-routing.module";
import { RecipesModule } from "app/recipes/recipes.module";
import { SharedModule } from "app/shared/shared.module";
import { HttpModule } from "@angular/http";
import { TodoistService } from "app/food/todoist.service";
import { FoodModule } from "app/food/food.module";
import { SettingsModule } from "app/settings/settings.module";
import { SettingsService } from "app/settings/settings.service";
import { SettingsGuardService } from "app/settings/settings-guard.service";
import { AuthModule } from "app/auth/auth.module";
import { AuthService } from "app/auth/auth.service";
import { AuthGuard } from "app/auth/auth-guard.service";

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
    FoodModule,
    SettingsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [
    RecipeService,
    FoodService,
    TodoistService,
    SettingsService,
    SettingsGuardService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
