import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ErrorComponent } from './containers/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailverificationComponent } from './containers/emailverification/emailverification.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, ErrorComponent, EmailverificationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
