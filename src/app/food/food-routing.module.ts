import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from "app/food/menu/menu.component";

const foodRoutes: Routes = [
    {
        path: '', component: MenuComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(foodRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class FoodRoutingModule { }
