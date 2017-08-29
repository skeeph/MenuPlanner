import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "app/recipes/recipes.component";
import { SettingsGuardService } from "app/settings/settings-guard.service";


const appRoutes: Routes = [
    { path: '', loadChildren:'./food/food.module#FoodModule', canActivate:[SettingsGuardService]},
    { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule', canActivate:[SettingsGuardService] },
    { path: 'settings', loadChildren:'./settings/settings.module#SettingsModule' },
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}