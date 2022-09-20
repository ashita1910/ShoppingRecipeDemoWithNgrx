import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeDetail = this.recipeService.getRecipeById(params.id - 1);
      this.id = params.id - 1;
    });
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addToShoppingList(this.recipeDetail.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipeFromShoppingList(this.id);
    this.router.navigate(['recipes/no-recipe']);
  }

}
