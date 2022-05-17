 /*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 11 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the user profile component.
=======================================
*/

// Imported modules
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../../shared/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  id: any;
  errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private route: ActivatedRoute,) {

    }

    ngOnInit() {
      // get userId from cookie and pull information from DB
      this.id = this.cookieService.get('session_id');
      console.log('User ID: ' + this.id);
      this.http.get('/api/session/users/' + this.id).subscribe(res => {
        if (res) {
          return this.user = res;
        } else {
          console.log('Error no user found with id: ' + this.id);
          return this.errorMessage = "No user found";
        }
      })
    }
}


