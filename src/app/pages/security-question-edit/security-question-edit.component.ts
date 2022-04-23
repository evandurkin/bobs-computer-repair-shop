/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: updating user dialog
=======================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-question-edit',
  templateUrl: './security-question-edit.component.html',
  styleUrls: ['./security-question-edit.component.css']
})
export class SecurityQuestionEditComponent implements OnInit {

  questionForm: FormGroup;
  questionData: SecurityQuestion;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SecurityQuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.questionData = data.questionData
  }

  ngOnInit(): void {
    console.log(this.questionData.text)
    this.questionForm = new FormGroup({
      text: new FormControl(this.questionData.text, Validators.required)
    })
  }

  editQuestion() {
    this.dialogRef.close(this.questionForm.value);
  }

  cancel(){
    this.dialogRef.close();
  }
}
