import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOG_IN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };
    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
