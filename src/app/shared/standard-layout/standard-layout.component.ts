/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 28 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the standard-layout component.
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.css'],
})
export class StandardLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean; // Checks if a user is logged in.
  userName: string;
  userRole: any;
  adminRole: string;

  constructor(private cookieService: CookieService, private router: Router, private roleService: RoleService ) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    this.userName = sessionStorage.getItem('userName');
    console.log('Signed in as: ' + this.userName);

    // Hides navigation items to all but admin users
    this.roleService.findUserRole(this.cookieService.get('session_user')).subscribe(res => {
      this.userRole = res['data'].role;
    })
  }

  ngOnInit(): void {
    this.userName = this.cookieService.get('session_user');
  }
  employeeDash() {
    this.router.navigate(['/session-employee/dashboard-employee']); // Route to the employee dashborad
  }
  adminDash() {
    this.router.navigate(['/session/dashboard-admin']); // Route to the employee dashboard
  }

  // Delete session-user cookie and redirect to home page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }

  adminReport(): void {
    this.router.navigate(['/session-employee/services-graph']);
  }

  editProfile(): void {
    this.router.navigate(['/session-employee/user-profile']); //this
  }

  servicesPage(): void {
    this.router.navigate(['/session-employee/dashboard-employee']);
  }
}
