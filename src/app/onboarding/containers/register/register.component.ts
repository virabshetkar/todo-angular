import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Store } from '@ngrx/store';
import { RegistrationModel } from '../../../core/models/registration.model';
import { registerUser } from '../../../core/store/user/user.actions';
import { userSelector } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user$ = this.store.select(userSelector);
  errorMessage?: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user.error) {
        if (user.error instanceof FirebaseError) {
          if (user.error.code === 'auth/user-not-found') {
            this.errorMessage = 'Email not registered';
          } else if (user.error.code === 'auth/wrong-password') {
            this.errorMessage = 'Password is incorrect';
          } else if (user.error.code === 'auth/too-many-requests') {
            this.errorMessage = 'User has many failed login attempts';
          } else if (user.error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Email is already registered';
          }
        }
      } else this.errorMessage = undefined;
    });
  }

  register(user: RegistrationModel) {
    this.store.dispatch(registerUser({ user }));
  }
}
