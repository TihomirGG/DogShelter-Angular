export interface UserLoginPayload {
  email: string;
  password:string;
  firstName: string;
  lastName: string;
  isLogged: boolean;
}

export interface UserLoginSuccessPayload {
  email: string;
  firstName: string;
  lastName: string;
  isLogged: boolean;
}

export interface UserLoginFailurePayload {
  errorMsg: string;
}
