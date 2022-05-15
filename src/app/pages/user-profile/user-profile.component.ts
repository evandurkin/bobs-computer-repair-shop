/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User List Component
=======================================
*/

// Imported modules
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})

export class UserProfileComponent implements OnInit {

  user: any;
  id: any;
  errorMessage: string;


  constructor(private http: HttpClient, private cookieService: CookieService) { }

    // Find user (account holder)
    ngOnInit() {

      // get userId from cookie and pull information from DB
      this.id = this.cookieService.get('userId');
      console.log(this.id);

      // Call findUserById api
      this.http.get(`/api/users/${this.id}`).subscribe(res => {

        if (res) {
          return this.user = res;
        } else {
          console.log('Error no user found with id: ' + this.id);
          return this.errorMessage = "No user found";
        }
      });
    };
};
