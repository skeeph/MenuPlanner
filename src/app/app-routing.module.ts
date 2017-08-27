import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "app/recipes/recipes.component";


const appRoutes: Routes = [
    { path: '', loadChildren:'./food/food.module#FoodModule' },
    { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule' },
    { path: 'settings', loadChildren:'./settings/settings.module#SettingsModule' },
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}