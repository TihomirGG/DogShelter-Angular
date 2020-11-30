import { createSelector } from '@ngrx/store';
import { ApplicationState, UserState } from '../states';

export const userSelector = (state: ApplicationState) => state.UserState;

export const selector = createSelector(userSelector,(state:UserState) => state);
