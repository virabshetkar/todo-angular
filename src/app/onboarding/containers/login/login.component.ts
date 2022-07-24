import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Store } from '@ngrx/store';
import { CredentialModel } from '../../../core/models/credentials.model';
import { loginUser } from '../../../core/store/user/user.actions';
import { userSelector } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  todoList: { title: string; desc: string }[] = [];

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
          }
        }
      } else this.errorMessage = undefined;
    });
  }

  loginWithEmail(credentials: CredentialModel) {
    this.store.dispatch(loginUser({ credentials }));
  }
}
