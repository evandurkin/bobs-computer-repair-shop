/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 27 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the verify-user component.
=======================================
*/

// Imported Modules
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-username',
  templateUrl: './verify-username.component.html',
  styleUrls: ['./verify-username.component.css']
})
export class VerifyUsernameComponent implements OnInit {

  form: FormGroup;
  errorMessages:  string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, ) { }


   // Requires username on form
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  // Validation
  validateUsername() {
    const username = this.form.controls['username'].value;

    // Calls verify user api to match username
    this.http.get(`/api/session/verify/users/${username}`).subscribe(res => {

      // If username matches, user is routed to verify-security-questions.
      if (res) {
        this.router.navigate(['/post-session/verify-security-questions'], {queryParams: {username: username},
        skipLocationChange: true
      });
      }
      // If user enters invalid username
    }, err => {
      this.errorMessages = ('Invalid user name. Please try again.')
      console.log(err);
    })
  }

}
