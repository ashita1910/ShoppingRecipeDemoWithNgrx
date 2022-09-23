import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredientArr();
    // this.shoppingListService.allIngredients.subscribe((ingredients: Ingredient[]) => {
    //   if(ingredients) {
    //     this.ingredients = ingredients;
    //   }
    // });
    // this.shoppingListService.ingredient.subscribe((ingredient: Ingredient) => {
    //   if (ingredient) {
    //     this.ingredients.push(ingredient);
    //     this.shoppingListService.ingredients.push(ingredient);
    //   }
    // });
  }

  edit(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.editShoppingList.next(index);
  }
}
