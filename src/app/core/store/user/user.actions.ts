import { createAction, props } from '@ngrx/store';
import { Status, UserAction, userAction } from '../../enums/action.enums';
import { CredentialModel } from '../../models/credentials.model';
import { UserRegistrationModel } from '../../models/registration.model';
import { UserModel } from '../../models/user.model';

//#region Register

export const registerUser = createAction(
  userAction(UserAction.REGISTER, Status.START),
  props<{ user: UserRegistrationModel }>()
);

export const registerSuccess = createAction(
  userAction(UserAction.REGISTER, Status.SUCCESS),
  props<{ error: any }>()
);

export const registerFailure = createAction(
  userAction(UserAction.REGISTER, Status.FAILURE),
  props<{ error: any }>()
);

//#endregion

//#region Login
export const loginUser = createAction(
  userAction(UserAction.LOGIN, Status.START),
  props<{ credentials: CredentialModel }>()
);

export const loginSuccess = createAction(
  userAction(UserAction.LOGIN, Status.SUCCESS),
  props<{ user: UserModel }>()
);

export const loginFailure = createAction(
  userAction(UserAction.LOGIN, Status.FAILURE),
  props<{ error: any }>()
);

export const googleLogin = createAction(
  userAction(UserAction.GOOGLE_LOGIN, Status.START)
);

export const loginEnd = createAction(userAction(UserAction.LOGIN, Status.END));
//#endregion

//#region Change Password

export const changePassword = createAction(
  userAction(UserAction.CHANGE_PASSWORD, Status.START),
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordSuccess = createAction(
  userAction(UserAction.CHANGE_PASSWORD, Status.SUCCESS)
);

export const changePasswordFailure = createAction(
  userAction(UserAction.CHANGE_PASSWORD, Status.FAILURE),
  props<{ error: any }>()
);

export const changePasswordEnd = createAction(
  userAction(UserAction.CHANGE_PASSWORD, Status.END)
);

//#endregion
