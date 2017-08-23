import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WeekComponent } from "app/week/week.component";
import { RecipesComponent } from "app/recipes/recipes.component";


const appRoutes: Routes = [
    { path: '', component: WeekComponent },
    { path: 'recipes', component: RecipesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}