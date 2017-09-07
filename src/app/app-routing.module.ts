import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "app/recipes/recipes.component";
import { SettingsGuardService } from "app/settings/settings-guard.service";
import { AuthGuard } from "app/auth/auth-guard.service";


const appRoutes: Routes = [
    { path: '', loadChildren: './food/food.module#FoodModule', canActivate: [AuthGuard, SettingsGuardService] },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canActivate: [AuthGuard, SettingsGuardService] },
    { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard,] },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}