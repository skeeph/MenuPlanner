import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { RecipeService } from "app/recipes/recipe.service";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { Recipe } from "app/recipes/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipePublic = false;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipePublic = recipe.publ;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*.[0-9]*?$/)
              ]),
              'unit': new FormControl(ingredient.unit, Validators.required),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'public': new FormControl(recipePublic),
      'ingredients': recipeIngredients
    });
  }
  onSubmit() {
    let formval = this.recipeForm.value
    let recipe = new Recipe(
      formval.name,
      formval.imagePath,
      formval.ingredients,
      formval.description,
      formval.public
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe)
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../recipes']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'unit': new FormControl(null, Validators.required)
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
