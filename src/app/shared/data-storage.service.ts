import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    return this.http
      .put(
        'https://shopping-recipe-book-54cde-default-rtdb.firebaseio.com/recipes.json',
        this.recipeService.recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://shopping-recipe-book-54cde-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
          // this.recipeService.setRecipes(recipes);
        })
      );
  }
}
