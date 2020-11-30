export interface UserState {
  loggedIn?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  uid?: string,
  errorMsg?: string;
}

export interface ApplicationState {
  UserState: UserState;
}

//initail value
export const INITIAL_USER_STATE: UserState = {
  loggedIn: false,
  email: '',
  firstName: '',
  lastName: '',
  uid: '',
};

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  UserState: INITIAL_USER_STATE,
};
