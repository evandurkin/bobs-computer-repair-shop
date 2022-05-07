/*
===================================================
// Title: Bob’s Computer Repair Shop
// Date: 1 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the sign-up component.
===================================================
*/

// Imported modules
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';
import { User } from ".../../server/models/user.js";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignUpComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  contactForm: FormGroup;
  securityQuestionsForm: FormGroup;
  credentialsForm: FormGroup;

  errorMessages: string;

  // Define params
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private CookieService: CookieService, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data']
    }, err => {
      console.log(err);
    })
   }

   // Contact form
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      street: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zip: [null, Validators.compose([Validators.required])]

    });

    // Security questions form
    this.securityQuestionsForm = this.fb.group({
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });

    // Verification form
    this.credentialsForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
    });
  }

  //Register function
  register() {

    // Bind each form to a variable
    const contactInformation = this.contactForm.value;
    const securityQuestions = this.securityQuestionsForm.value;
    const credentials = this.credentialsForm.value;

    // Selected Security Questions defined as questionText and answerText
    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      }
    ];

    console.log(selectedSecurityQuestions);

     // Calls to register api and inserts the values to create a user
    this.http.post('/api/session/register', {

      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {

      // User is authenticated and permitted access to the employee dashboard.
      this.CookieService.set('sessionuser', credentials.userName, 1);
      this.router.navigate(['session/dashboard-employee']);
    }, err => {
      this.errorMessages = (`Node.js server error; httpCode:${err.httpCode};message:${err.message}`)
      console.log(err);
    });
  }
}
