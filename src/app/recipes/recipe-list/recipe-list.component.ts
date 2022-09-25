import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    private recipeSercvice: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipesSubscription = this.store
      .select('recipes')
      .subscribe((state) => {
        this.recipes = state?.recipes;
      });
    // this.recipesSubscription = this.recipeSercvice.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });
    // this.recipes = this.recipeSercvice.getRecipes();
  }

  sendRecipeDetail(index) {
    this.router.navigate([index + 1 + ''], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
