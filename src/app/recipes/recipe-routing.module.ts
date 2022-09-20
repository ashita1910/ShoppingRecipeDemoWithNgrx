import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { FetchDataResolverService } from '../shared/fetch-data-resolver.service';
import { NoRecipeDetailComponent } from './no-recipe-detail/no-recipe-detail.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    resolve: [FetchDataResolverService],
    children: [
      { path: '', component: NoRecipeDetailComponent },
      { path: 'no-recipe', component: NoRecipeDetailComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        resolve: [FetchDataResolverService],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [FetchDataResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [FetchDataResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
