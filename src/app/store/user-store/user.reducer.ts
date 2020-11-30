import { UserState } from '../states';
import { UserActions, UserActionTypes } from './user.actions';

export function storeData(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_ACTION_SUCCESSFULL:
      return {
        loggedIn: true,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case UserActionTypes.USER_LOGIN_ACTION_FAILURE:
      return {
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
}
