/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the auth-layout component.
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean; // Checks if a user is logged in.
  userName: string;
  userRole: any;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    this.userName = this.cookieService.get('session_user')
    // this.userName = sessionStorage.getItem('userName');
    console.log('Signed in as: ' + this.userName);
  }

  // Logic for icon menu items
  ngOnInit(): void {
    this.userName = this.cookieService.get('session_user');
  }

  // Check if user has Admin role
  isAdmin(): boolean {
    return this.userRole.role === 'admin';
  }

  adminHome() {
    this.router.navigate(['/session/dashboard-admin'])
  }

  userConfig(): void {
    this.router.navigate(['/session/users']);
  }

  questionConfig(): void {
    this.router.navigate(['/session/security-questions']);
  }

  // Delete session-user cookie and redirect to home page
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }
  roleConfig(): void {
    this.router.navigate(['/session/role-list']);
  }

  adminReport(): void {
    this.router.navigate(['/session/services-graph']);
  }

  servicesConfig(): void {
    this.router.navigate(['/session/services']);
  }

}
