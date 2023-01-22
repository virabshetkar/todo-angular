import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Store } from '@ngrx/store';
import { UserRegistrationModel } from '../../../core/models/registration.model';
import { registerUser } from '../../../core/store/user/user.actions';
import { userSelector } from '../../../core/store/user/user.selectors';
import { FirebaseErrorHandlerService } from '../../services/firebase-error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  register(user: UserRegistrationModel) {
    this.store.dispatch(registerUser({ user }));
  }
}
