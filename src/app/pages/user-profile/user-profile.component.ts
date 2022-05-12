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
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  isLoggedIn: boolean;
  displayedColumns = [

    'userName',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'email',
    'functions',
  ];
  constructor( private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private cookieService: CookieService
  ) {
      // Retrieve user id from the url
      this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
      this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.editUserById(this.userId).subscribe(

      (res) => {
        this.user = res['data'];
        console.log(this.user);
      },
      // Error Handling
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
     // Form validators
     this.form = this.fb.group({

      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      addressLineOne: [null, Validators.compose([Validators.required])],
      addressLineTwo: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zip: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email]),]
    });
  }
  updateUser(): void {

    // Get form values
    const updatedUser: User = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      addressLineOne: this.form.controls.addressLineOne.value,
      addressLineTwo: this.form.controls.addressLineTwo.value,
      city: this.form.controls.city.value,
      state: this.form.controls.state.value,
      zip: this.form.controls.zip.value,
      email: this.form.controls.email.value
    };

    console.log('savedUser object');
    console.log(updatedUser);

    // Update the user
    this.userService.updateUser(this.userId, updatedUser).subscribe(

      (res) => {
        // Route to the users -list component
        this.router.navigate(['/session-employee/user-profile']);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  // Cancel
  cancel(): void {
    this.router.navigate(['/session-employee/user-profile']);
  }
  }

