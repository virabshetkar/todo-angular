import { createAction, props } from '@ngrx/store';
import { Status, UserAction, userAction } from '../../enums/action.enums';
import { CredentialModel } from '../../models/credentials.model';
import { RegistrationModel } from '../../models/registration.model';
import { UserModel } from '../../models/user.model';

export const registerUser = createAction(
  userAction(UserAction.REGISTER, Status.START),
  props<{ user: RegistrationModel }>()
);
export const registerSuccess = createAction(
  userAction(UserAction.REGISTER, Status.SUCCESS),
  props<{ error: any }>()
);
export const registerFailure = createAction(
  userAction(UserAction.REGISTER, Status.FAILURE),
  props<{ error: any }>()
);
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
export const loginEnd = createAction(userAction(UserAction.LOGIN, Status.END));
