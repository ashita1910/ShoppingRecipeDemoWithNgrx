import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('f') editForm: NgForm;
  editMode: boolean = false;
  editInd: number;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((state) => {
      if (state?.editedIngredientIndex > -1) {
        this.editInd = state?.editedIngredientIndex;
        this.editMode = true;
        this.editForm?.setValue({
          name: state?.editedIngredient?.name,
          amount: state?.editedIngredient?.amount,
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.editShoppingList.subscribe(
    //   (ind) => {
    //     this.editMode = true;
    //     this.editInd = ind;
    //     this.editForm.setValue({
    //       name: this.shoppingListService.getIngredient(ind).name,
    //       amount: this.shoppingListService.getIngredient(ind).amount,
    //     });
    //   }
    // );
  }

  addIngredient(f: NgForm) {
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          new Ingredient(
            f?.form?.controls?.name?.value,
            f?.form?.controls?.amount?.value
          )
        )
      );
    } else {
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(
          new Ingredient(
            f?.form?.controls?.name?.value,
            f?.form?.controls?.amount?.value
          )
        )
      );
    }
    f.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  clear() {
    this.editForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  delete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clear();
  }
}
