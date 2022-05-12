/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 25 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: App routing module for BCRS App.
=======================================
*/

// Routers
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { PostLayoutComponent } from './shared/post-layout/post-layout.component';
import { StandardLayoutComponent } from './shared/standard-layout/standard-layout.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardEmployeeComponent } from './pages/dashboard-employee/dashboard-employee.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VerifyUsernameComponent } from './shared/forms/verify-username/verify-username.component';
import { VerifySecurityQuestionsComponent } from './shared/forms/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './shared/forms/reset-password/reset-password.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ServicesListComponent } from './pages/services-list/services-list.component';
import { ServicesEditComponent } from './pages/services-edit/services-edit.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { GuestServicesComponent } from './pages/guest-services/guest-services.component';
import { ServicesGraphComponent } from './pages/services-graph/services-graph.component';

// Guards
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  /* Public Routes for guests */
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'guest-services',
        component: GuestServicesComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },

  /* Admin Users (canActivate routes) */
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'dashboard-admin',
        component: DashboardAdminComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'user-create',
        component: UserCreateComponent
      },
      {
        path: 'users/:userId',
        component: UserUpdateComponent
      },
      {
        path: 'role-list',
        component: RoleListComponent
      },
      {
        path: 'role-create',
        component: RoleCreateComponent
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-questions/create',
        component: SecurityQuestionCreateComponent
      },
      {
        path: 'services',
        component: ServicesListComponent
      },
      {
        path: 'services/create',
        component: ServicesEditComponent
      },
      {
        path: 'services-graph',
        component: ServicesGraphComponent
      },
    ]
  },
  /* Standard-employee users (canActivate) */
  {
    path: 'session-employee',
    component: StandardLayoutComponent,
    children: [
      {
        path: 'dashboard-employee',
        component: DashboardEmployeeComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'user-create',
        component: UserCreateComponent,
      },
      {
        path: 'services-graph',
        component: ServicesGraphComponent,

      },
    ]
  },

  /* Routes to pages with no headers */
  {
    path: 'post-session',
    component: PostLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'user-details',
        component: VerifyUsernameComponent,
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: '404-error',
        component: NotFoundComponent,
      },
      {
        path: '500-error',
        component: InternalServerErrorComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
