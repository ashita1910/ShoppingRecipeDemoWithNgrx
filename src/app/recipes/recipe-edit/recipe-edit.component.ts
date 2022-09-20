import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id - 1;
      this.editMode = params.id != null ? true : false;
    });
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    let ingredients = new FormArray([]);

    if(this.editMode) {
      let recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.desc;
      recipeImagePath = recipe.imagePath;
      if(recipe.ingredients) {
        for(let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: ingredients
    });
  }

  onSubmit() {
    const recipe = new Recipe(this.recipeForm.controls.name.value, this.recipeForm.controls.description.value, this.recipeForm.controls.imageUrl.value, this.recipeForm.controls.ingredients.value);
    this.editMode ? this.recipeService.updateRecipes(this.id, recipe) :
    this.recipeService.addRecipe(recipe);
    this.router.navigate(['recipes/no-recipe']);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['recipes/no-recipe']);
  }

  addIngredient() {
    let ingredientsArr = this.recipeForm.controls.ingredients as FormArray;
    ingredientsArr.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  deleteIngredient(index: number) {
    let ingredientsArr = this.recipeForm.controls.ingredients as FormArray;
    ingredientsArr.removeAt(index);
  }

}
