import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationModel } from '../../../core/models/registration.model';
import { SameValueValidator } from '../../../core/validators/same-value.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationFormGroup: FormGroup;

  @Output() registerUser = new EventEmitter<RegistrationModel>();
  @Input() errorMessage?: string;

  isSubmitted?: boolean;

  constructor(fb: FormBuilder) {
    this.registrationFormGroup = fb.group(
      {
        firstName: fb.control('', [Validators.required]),
        lastName: fb.control('', [Validators.required]),
        email: fb.control('', [Validators.required, Validators.email]),
        phoneNumber: fb.control('', [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
        password: fb.control('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        repeatPassword: fb.control('', [Validators.required]),
      },
      { validator: [SameValueValidator('password', 'repeatPassword')] }
    );
  }

  get firstName() {
    return this.registrationFormGroup.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registrationFormGroup.get('lastName') as FormControl;
  }
  get email() {
    return this.registrationFormGroup.get('email') as FormControl;
  }
  get phoneNumber() {
    return this.registrationFormGroup.get('phoneNumber') as FormControl;
  }
  get password() {
    return this.registrationFormGroup.get('password') as FormControl;
  }
  get repeatPassword() {
    return this.registrationFormGroup.get('repeatPassword') as FormControl;
  }

  ngOnInit(): void {}

  submitForm() {
    this.isSubmitted = true;
    this.registerUser.emit(this.registrationFormGroup.value);
  }
}
