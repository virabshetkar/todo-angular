import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Input() errorMessage?: string;

  loginFormGroup: FormGroup;
  isSubmitted?: boolean;

  constructor(fb: FormBuilder, private store: Store) {
    this.loginFormGroup = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get emailControl() {
    return this.loginFormGroup.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginFormGroup.get('password') as FormControl;
  }

  submitForm() {
    this.isSubmitted = true;
    this.login.emit(this.loginFormGroup.value);
  }
}
