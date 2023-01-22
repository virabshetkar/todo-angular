import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import {
  changePassword,
  changePasswordEnd,
} from 'src/app/core/store/user/user.actions';
import { userSelector } from 'src/app/core/store/user/user.selectors';
import {
  NotSameValueValidator,
  SameValueValidator,
} from 'src/app/core/validators/same-value.validator';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
})
export class PasswordChangeDialogComponent implements OnInit, OnDestroy {
  minPasswordLength = 6;

  errorMessage$ = this.store
    .select(userSelector)
    .pipe(map((data) => this.getErrorMessage(data.error)));

  showButton$ = this.store
    .select(userSelector)
    .pipe(map((data) => !data.isLoading));

  passwordChangeForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.passwordChangeForm = fb.group(
      {
        currentPassword: fb.control('', [
          Validators.required,
          Validators.minLength(this.minPasswordLength),
        ]),
        newPassword: fb.control('', [
          Validators.required,
          Validators.minLength(this.minPasswordLength),
        ]),
        confirmPassword: fb.control('', [
          Validators.required,
          Validators.minLength(this.minPasswordLength),
        ]),
      },
      {
        validator: [
          SameValueValidator('newPassword', 'confirmPassword'),
          NotSameValueValidator('currentPassword', 'newPassword'),
        ],
      }
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(changePasswordEnd());
  }

  get currentPassword() {
    return this.passwordChangeForm.get('currentPassword') as FormControl;
  }

  get newPassword() {
    return this.passwordChangeForm.get('newPassword') as FormControl;
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword') as FormControl;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {}

  changePassword() {
    this.store.dispatch(
      changePassword({
        oldPassword: this.currentPassword.value,
        newPassword: this.newPassword.value,
      })
    );
  }

  private getErrorMessage(error: any) {
    if (!error) return null;
    if (error.code === 'auth/wrong-password') {
      return 'Current Password is incorrect';
    } else if (error.code === 'auth/too-many-requests') {
      return 'You have many failed attempts';
    }
    return error.message;
  }
}
