export enum Status {
  START = 'START',
  END = 'END',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export enum UserAction {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  GOOGLE_LOGIN = 'GOOGLE LOGIN',
  LOGOUT = 'LOGOUT',
  CHANGE_PASSWORD = 'CHANGE PASSWORD'
}

export type UserActions = `[USER] ${UserAction} ${Status}`;

export const userAction = (userAction: UserAction, status: Status): string => {
  return `[USER] ${userAction} ${status}`;
};
