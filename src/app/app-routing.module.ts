import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "app/recipes/recipes.component";


const appRoutes: Routes = [
    { path: '', loadChildren:'./food/food.module#FoodModule' },
    { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule' },
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}