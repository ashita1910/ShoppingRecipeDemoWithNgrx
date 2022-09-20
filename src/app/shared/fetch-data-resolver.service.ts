import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FetchDataResolverService implements Resolve<any> {

  constructor(private dataService:  DataStorageService, private recipeService: RecipeService) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    if(this.recipeService.recipes.length === 0) {
      return this.dataService.fetchRecipes().subscribe();
    } else {
      return this.recipeService.recipes;
    }
  }
}
