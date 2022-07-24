import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from './user.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';

const MaterialImports = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
];

@NgModule({
  declarations: [NavbarComponent, UserComponent, DashboardComponent],
  imports: [CommonModule, MaterialImports, UserRoutingModule],
})
export class UserModule {}
