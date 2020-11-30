import { Injectable } from '@angular/core';
import { Effect, Actions,createEffect,ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, delay, switchMap } from 'rxjs/operators';

import { UserActions, UserActionTypes, UserLoginAction, UserLoginActionFailure, UserLoginActionSuccess } from './user.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class UserEffects {
   
  constructor(private actions: Actions, private userService:UserService) {}

  @Effect()
 logIn: Observable<any>= this.actions.pipe(
      ofType(UserActionTypes.USER_LOGIN_ACTION),
      map((action: UserLoginAction) => action.payload),
      switchMap(payload => {
          return   this.userService.login(payload.email,payload.password).then(x => {
              x.forEach(item => {
                  const data = item.data();
                  const firstName = data?.firstName as string;
                  const lastName = data?.lastName as string;
                  const email = data?.email as string;
                  const isLogged = true;
                  const newPayload = new UserLoginActionSuccess({firstName,lastName,email,isLogged})
                  return newPayload;
              })
          })
          
      }),
      catchError(error => of(new UserLoginActionFailure(error)))
  )
}
