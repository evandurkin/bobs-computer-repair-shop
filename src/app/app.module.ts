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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Component imports
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SecurityQuestionEditComponent } from './pages/security-question-edit/security-question-edit.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { PostLayoutComponent } from './shared/post-layout/post-layout.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StandardLayoutComponent } from './shared/standard-layout/standard-layout.component';
import { DashboardEmployeeComponent } from './pages/dashboard-employee/dashboard-employee.component';

// Browser, Http, Forms, and Cookie imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ErrorInterceptor } from './shared/error.interceptor'


// Flex Layout and Material UI Imports
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { ResetPasswordComponent } from './shared/forms/reset-password/reset-password.component';
import { VerifyUsernameComponent } from './shared/forms/verify-username/verify-username.component';
import { VerifyPasswordComponent } from './shared/forms/verify-password/verify-password.component';
import { VerifySecurityQuestionsComponent } from './shared/forms/verify-security-questions/verify-security-questions.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    UserListComponent,
    SecurityQuestionEditComponent,
    SecurityQuestionListComponent,
    DeleteRecordDialogComponent,
    SignInComponent,
    DashboardAdminComponent,
    SignUpComponent,
    SecurityQuestionCreateComponent,
    PostLayoutComponent,
    UserCreateComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    StandardLayoutComponent,
    DashboardEmployeeComponent,
    UserUpdateComponent,
    ResetPasswordComponent,
    VerifyUsernameComponent,
    VerifyPasswordComponent,
    VerifySecurityQuestionsComponent,
    InternalServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
