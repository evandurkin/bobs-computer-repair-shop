/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the base-layout component.
=======================================
*/

// Imported Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean; // Checks if a user is logged in.
  userName: string;
  userRole: any;

  constructor(private cookieService: CookieService, private router: Router) {

    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    this.userName = sessionStorage.getItem('userName');
    console.log('Signed in as: ' + this.userName);
  }

  // Logic for icon menu items
 ngOnInit(): void {
    this.userName = this.cookieService.get('session_user');
  }

  isAdmin(): boolean {
    return this.userRole.role === 'admin';
  }

  userConfig(): void {
    this.router.navigate([]);
  }

  questionConfig(): void {
    this.router.navigate([]);
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate([]);
  }
  roleConfig(): void{
    this.router.navigate([]);
  }

  adminReport(): void {
    this.router.navigate([])
  }

}
