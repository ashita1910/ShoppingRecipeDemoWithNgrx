import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://shopping-recipe-book-54cde-default-rtdb.firebaseio.com/recipes.json', this.recipeService.recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://shopping-recipe-book-54cde-default-rtdb.firebaseio.com/recipes.json').pipe(map((recipes) => {
      return recipes.map((recipe) => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      })
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
