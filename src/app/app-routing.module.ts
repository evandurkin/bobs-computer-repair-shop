import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { PostLayoutComponent } from './shared/post-layout/post-layout.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
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
        path: 'security-questions',
        component: SecurityQuestionListComponent
      }
    ],
  },
   {
    path: 'post-session',
    component: PostLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'session/not-found',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
