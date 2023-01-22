import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import {
  changePassword,
  changePasswordEnd,
  changePasswordFailure,
  changePasswordSuccess,
  googleLogin,
  loginEnd,
  loginFailure,
  loginSuccess,
  loginUser,
  registerFailure,
  registerSuccess,
  registerUser,
} from './user.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  //#region Login

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) =>
        this.auth.signInWithEmail(action.credentials).pipe(
          map((user) => {
            if (!user) return loginFailure({ error: 'User Not Found' });
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  googleLoginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLogin),
      mergeMap(() =>
        this.auth.signInWithGoogle().pipe(
          map((user) => {
            if (!user)
              return loginFailure({ error: "Couldn't sign into google" });
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['user']);
        }),
        catchError((error) => {
          return of(loginFailure({ error }));
        })
      ),
    { dispatch: false }
  );

  //#endregion

  //#region Register

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((action) =>
        this.auth.registerUser(action.user).pipe(
          map(() => registerSuccess({ error: null })),
          catchError((error) => of(registerFailure({ error })))
        )
      )
    )
  );

  registerSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigate(['login']);
          this.snackbar.open('Registration Successful', undefined, {
            duration: 2000,
          });
        })
      ),
    { dispatch: false }
  );

  //#endregion

  //#region Change Password

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      mergeMap(({ oldPassword, newPassword }) =>
        this.auth.changePassword(oldPassword, newPassword).pipe(
          map(() => changePasswordSuccess()),
          catchError((error) => of(changePasswordFailure({ error })))
        )
      )
    )
  );

  changePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordSuccess),
      map(() => {
        this.dialog.closeAll();
        this.snackbar.open('Password Change Successful', undefined, {
          duration: 2000,
        });
        return changePasswordEnd();
      })
    )
  );

  //#endregion
}
