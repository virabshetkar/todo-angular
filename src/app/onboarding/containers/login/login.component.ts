import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Store } from '@ngrx/store';
import { CredentialModel } from '../../../core/models/credentials.model';
import { loginUser } from '../../../core/store/user/user.actions';
import { userSelector } from '../../../core/store/user/user.selectors';
import { FirebaseErrorHandlerService } from '../../services/firebase-error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  todoList: { title: string; desc: string }[] = [];

  user$ = this.store.select(userSelector);
  errorMessage?: string;

  constructor(
    private store: Store,
    private errorHandler: FirebaseErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.errorMessage = this.errorHandler.getErrorMessage(user.error);
    });
  }

  loginWithEmail(credentials: CredentialModel) {
    this.store.dispatch(loginUser({ credentials }));
  }
}
