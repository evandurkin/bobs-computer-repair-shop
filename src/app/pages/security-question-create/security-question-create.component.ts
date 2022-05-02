/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 1 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User List Component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionService: SecurityQuestionService)
    { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  // create new security question
  create(): void {
    const newSecurityQuestion: SecurityQuestion = {
      text: this.form.controls.text.value,
      _id: ''
    }

    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/session/security-questions']);
    }, err => {
      console.log(err);
    });
  }

  // cancel button to close dialog
  cancel(): void {
    this.router.navigate(['/session/security-questions']);
  }

}
