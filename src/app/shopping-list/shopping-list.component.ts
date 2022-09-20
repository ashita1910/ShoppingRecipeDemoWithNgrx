import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredientArr();
    this.shoppingListService.allIngredients.subscribe((ingredients: Ingredient[]) => {
      if(ingredients) {
        this.ingredients = ingredients;
      }
    });
    this.shoppingListService.ingredient.subscribe((ingredient: Ingredient) => {
      if(ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListService.ingredients.push(ingredient);
      }
    });
  }

  edit(index: number) {
    this.shoppingListService.editShoppingList.next(index);
  }

}
