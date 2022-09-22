import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeDetail = this.recipeService.getRecipeById(params.id - 1);
      this.id = params.id - 1;
    });
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients)
    );
    // this.shoppingListService.addToShoppingList(this.recipeDetail.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipeFromShoppingList(this.id);
    this.router.navigate(['recipes/no-recipe']);
  }
}
