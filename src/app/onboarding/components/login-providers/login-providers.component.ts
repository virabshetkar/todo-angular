import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { googleLogin } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrls: ['./login-providers.component.scss'],
})
export class LoginProvidersComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  googleSignIn() {
    this.store.dispatch(googleLogin());
  }
}
