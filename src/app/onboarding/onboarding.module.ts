import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginProvidersComponent } from './components/login-providers/login-providers.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegisterComponent } from './containers/register/register.component';
import { UserStoreModule } from '../core/store/user/user-store.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialImports = [
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];
@NgModule({
  declarations: [
    OnboardingComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    NavbarComponent,
    LoginProvidersComponent,
    RegistrationFormComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserStoreModule,
    MaterialImports,
  ],
})
export class OnboardingModule {}
