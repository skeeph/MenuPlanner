import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from "app/recipes/recipes.component";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";

const recipeRoutes: Routes = [
    {
        path: '', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            //   { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
            //   { path: ':id', component: RecipeDetailComponent },
            //   { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class RecipesRoutingModule { }
