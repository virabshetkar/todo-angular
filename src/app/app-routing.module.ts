import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  redirectLoggedInTo,
  canActivate,
  AuthPipeGenerator,
} from '@angular/fire/compat/auth-guard';
import { ErrorComponent } from './containers/error/error.component';
import { map } from 'rxjs';
import { EmailverificationComponent } from './containers/emailverification/emailverification.component';

const redirectUnauthorizedOrUnverified: AuthPipeGenerator = () =>
  map((user) => {
    if (user) {
      if (user.emailVerified) return true;
      else return ['verifyemail'];
    } else return ['login'];
  });

const redirectAuthorized = () => redirectLoggedInTo(['user', 'todo']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/onboarding/onboarding.module').then(
        (m) => m.OnboardingModule
      ),
    ...canActivate(redirectAuthorized),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/user/user.module').then((m) => m.UserModule),
    ...canActivate(redirectUnauthorizedOrUnverified),
  },
  {
    path: 'error/:back',
    component: ErrorComponent,
  },
  {
    path: 'verifyemail',
    component: EmailverificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
