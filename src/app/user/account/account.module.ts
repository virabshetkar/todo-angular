import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from './components/password-change-dialog/password-change-dialog.component';

const MaterialImports = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    AccountComponent,
    AccountFormComponent,
    PasswordChangeDialogComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialImports,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AccountModule {}
