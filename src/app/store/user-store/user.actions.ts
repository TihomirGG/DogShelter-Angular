import { Action } from '@ngrx/store';
import {
  UserLoginFailurePayload,
  UserLoginPayload,
  UserLoginSuccessPayload,
} from './user.payloads';
export enum UserActionTypes{
    USER_LOGIN_ACTION = 'USER_LOGIN_ACTION',
    USER_LOGIN_ACTION_SUCCESSFULL = 'USER_LOGIN_ACTION_SUCCESSFULL',
    USER_LOGIN_ACTION_FAILURE = 'USER_LOGIN_ACTION_FAILURE',
}

export class UserLoginAction implements Action {
  readonly type = UserActionTypes.USER_LOGIN_ACTION;

  constructor(public payload: UserLoginPayload) {}
}

export class UserLoginActionSuccess implements Action {
  readonly type = UserActionTypes.USER_LOGIN_ACTION_SUCCESSFULL;

  constructor(public payload: UserLoginSuccessPayload) {}
}

export class UserLoginActionFailure implements Action {
  readonly type = UserActionTypes.USER_LOGIN_ACTION_FAILURE;

  constructor(public payload: UserLoginFailurePayload) {}
}

export type UserActions =
  | UserLoginActionSuccess
  | UserLoginAction
  | UserLoginActionFailure;
