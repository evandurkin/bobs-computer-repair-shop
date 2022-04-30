/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the verify-security-questions component.
=======================================
*/

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

  }

  ngOnInit(): void {

  }


}

