import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutingModule } from "app/food/food-routing.module";

import { MenuComponent } from './menu/menu.component';
import { DayComponent } from './menu/day/day.component';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  imports: [
    CommonModule,
    Ng2CompleterModule,
    FoodRoutingModule,
  ],
  declarations: [
    MenuComponent,
    DayComponent
  ]
})
export class FoodModule { }
