/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: updating user dialog
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-security-question-edit',
  templateUrl: './security-question-edit.component.html',
  styleUrls: ['./security-question-edit.component.css'],
})
export class SecurityQuestionEditComponent implements OnInit {
  questionForm: FormGroup;
  questionData: SecurityQuestion;
  questionId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private securityQuestionService: SecurityQuestionService
  ) {
    this.questionId = this.route.snapshot.paramMap.get('c');

    this.securityQuestionService
      .findSecurityQuestionById(this.questionId)
      .subscribe(
        (res) => {
          this.questionData = res['data'];
          console.log('Question Data' + this.questionData);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.questionForm.controls.text.setValue(this.questionData.text);
        }
      );
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  editQuestion(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.questionForm.controls.text.value,
      _id: '',
    };

    this.securityQuestionService
      .updateSecurityQuestion(this.questionId, updatedSecurityQuestion)
      .subscribe((res) => {
        this.router.navigate(['/security-questions']);
      });
  }

  cancel(): void {
    this.router.navigate(['/security-questions']);
  }
}
