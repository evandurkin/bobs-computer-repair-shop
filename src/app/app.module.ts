/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: App module for BCRS App.
=======================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';

// Browser, Http, Forms, and Cookie imports
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Flex Layout and Material UI Imports
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { SecurityQuestionEditComponent } from './pages/security-question-edit/security-question-edit.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    UserUpdateComponent,
    UserListComponent,
    SecurityQuestionEditComponent,
    SecurityQuestionListComponent,
    DeleteRecordDialogComponent,
    SignInComponent,
    DashboardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
