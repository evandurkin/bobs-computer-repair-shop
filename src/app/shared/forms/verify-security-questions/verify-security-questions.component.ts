/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the verify-security-questions component.
=======================================
*/

// Import Statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';


@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent implements OnInit {

  selectedSecurityQuestions: SecurityQuestion;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {

    this.username = this.route.snapshot.queryParamMap.get('username'); // Retrieve the username from the verify username form.
    console.log(this.username);

    //Get the users security questions
    this.http.get('/api/session/users/' + this.username + '/security-questions').subscribe(res => {

      //Bind the security questions data
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {

      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });
  }

  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

   //Verify the security questions

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3,

    }).subscribe(res => {
      console.log(res);
      if (res['message'] === 'success') {

        //If query is successful,route users to forgot password page
        this.router.navigate(['/post-session/reset-password'], { queryParams: { isAuthenticated: 'true', username: this.username }, skipLocationChange: true });
      } else {
        console.log('Unable to verify security question answers.');
        this.errorMessage = "The security questions were not answered correctly"
      }
    });
  }
}

