import { createFeature, createReducer, on } from '@ngrx/store';
import { State } from '../../models/state.model';
import { StoreCollection } from '../../enums/store-collections.enum';
import { UserModel } from '../../models/user.model';
import {
  changePassword,
  changePasswordEnd,
  changePasswordFailure,
  changePasswordSuccess,
  loginFailure,
  loginSuccess,
  loginUser,
  registerFailure,
  registerSuccess,
  registerUser,
} from './user.actions';

const initialState: State<UserModel> = {
  isLoading: false,
  isLoaded: false,
  data: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  //#region Login

  on(loginUser, () => {
    return { data: null, error: null, isLoading: true, isLoaded: false };
  }),

  on(loginFailure, (_, action) => {
    return {
      error: action.error,
      data: null,
      isLoading: false,
      isLoaded: true,
    };
  }),

  on(loginSuccess, (_, action) => {
    return {
      data: action.user,
      error: null,
      isLoading: false,
      isLoaded: true,
    };
  }),

  //#endregion

  //#region Register

  on(registerUser, (state, _) => {
    return { data: null, error: null, isLoading: true, isLoaded: false };
  }),

  on(registerSuccess, (state, _) => {
    return { ...state, isLoading: false };
  }),

  on(registerFailure, (state, action) => {
    return {
      error: action.error,
      data: null,
      isLoading: false,
      isLoaded: true,
    };
  }),

  //#endregion

  //#region Change Password

  on(changePassword, (state, _) => {
    return { ...state, isLoading: true };
  }),

  on(changePasswordSuccess, (state, _) => {
    return { ...state, isLoading: false };
  }),

  on(changePasswordFailure, (state, { error }) => {
    return { ...state, error, isLoading: false };
  }),

  on(changePasswordEnd, (state, _) => {
    return { ...state, error: null };
  })

  //#endregion
);

export const userFeature = createFeature({
  name: StoreCollection.USER,
  reducer: userReducer,
});
