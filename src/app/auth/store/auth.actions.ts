import { Action } from '@ngrx/store';

export const LOG_IN = '[Auth] Log In';
export const LOG_OUT = '[Auth] Log Out';

export class LogIn implements Action {
  readonly type: string = LOG_IN;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class LogOut implements Action {
  readonly type: string = LOG_OUT;
}

export type AuthActions = LogIn;
