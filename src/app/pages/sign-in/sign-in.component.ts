/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the sign-in component.
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

// Validators
   ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])], // Validator pattern
    });
  }

  // Sign in function capturing values
  signin(): void {

    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    // Service call to server api to authenticate user
    this.http.post('/api/session/sign-in', {

      userName,
      password
    }).subscribe(res => {
      console.log(res['data']);

      if (res['data'].userName) {
        this.cookieService.set('session_user', res['data'].userName, 1);
        this.cookieService.set('session_id', res['data']._id, 1);
        this.router.navigate(['/session-employee/dashboard-employee']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
  }

}
