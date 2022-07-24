import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { SameValueValidator } from '../../../../core/validators/same-value.validator';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
})
export class PasswordChangeDialogComponent implements OnInit {
  passwordChangeForm: FormGroup;

  constructor(fb: FormBuilder, private matDialog: MatDialog) {
    this.passwordChangeForm = fb.group(
      {
        currentPassword: fb.control('', [Validators.required]),
        newPassword: fb.control('', [Validators.required]),
        confirmPassword: fb.control('', [Validators.required]),
      },
      { validator: [SameValueValidator('newPassword', 'confirmPassword')] }
    );
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
    this.matDialog.closeAll();
  }

  ngOnInit(): void {}
}
