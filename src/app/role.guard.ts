/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 1 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: role guard for BCRS app.
=======================================
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './shared/services/role.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService
  ) {}

  // checks whether user is an 'Admin' role and grants access to those routes
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.roleService.findUserRole(this.cookieService.get('sessionUser')).pipe(map(res => {
      if (res['data'].text === 'Admin') {
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
    }));
  }

}
