import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  @ViewChild('f') editForm: NgForm;
  editMode: boolean = false;
  editInd: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editShoppingList.subscribe((ind) => {
      this.editMode = true;this.editInd = ind;
      this.editForm.setValue({
        name: this.shoppingListService.getIngredient(ind).name,
        amount: this.shoppingListService.getIngredient(ind).amount
      });
    });
  }

  addIngredient(f: NgForm) {
    this.editMode ? this.shoppingListService.updateIngredient(this.editInd, new Ingredient(f?.form?.controls?.name?.value, f?.form?.controls?.amount?.value)) : this.shoppingListService.ingredient.next(new Ingredient(f?.form?.controls?.name?.value, f?.form?.controls?.amount?.value));
    f.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clear() {
    this.editForm.reset();
    this.editMode = false;
  }

  delete() {
    this.shoppingListService.deleteIngredient(this.editInd);
    this.clear();
  }
}
