import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private auth: AngularFireAuth,
    private dialogService: MatDialog
  ) {
    this.accountForm = fb.group({
      displayName: fb.control('', [Validators.required]),
    });
  }

  get displayName() {
    return this.accountForm.get('displayName') as FormControl;
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.accountForm.patchValue({ displayName: user?.displayName });
    });
  }

  submit() {}

  openChangePassword() {
    this.dialogService.open(PasswordChangeDialogComponent);
  }
}
