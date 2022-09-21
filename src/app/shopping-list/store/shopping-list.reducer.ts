import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('ABC', 10), new Ingredient('XYZ', 20)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...(action.payload as Ingredient[]),
        ],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient = {
        ...state.ingredients[action.payload[0]],
        ...action.payload[1],
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload[0]] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const modifiedIngredients = [...state.ingredients];
      modifiedIngredients.splice(action.payload as number, 1);
      return {
        ...state,
        ingredients: modifiedIngredients,
      };
    default:
      return initialState;
  }
}
