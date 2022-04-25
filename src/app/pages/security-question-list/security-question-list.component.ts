/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User List Component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question';
import { SecurityQuestionEditComponent } from '../security-question-edit/security-question-edit.component';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css'],
})
export class SecurityQuestionListComponent implements OnInit {
  questions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(
    private dialog: MatDialog,
    private securityQuestionService: SecurityQuestionService
  ) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(
      (res) => {
        this.questions = res['data'];
        console.log('Questions data ' + this.questions);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  openSecurityQuestionUpdateDialog(questionId: string, questionText: string) {
    const dialogRef = this.dialog.open(SecurityQuestionEditComponent, {
      disableClose: true,
      data: {
        _id: questionId,
        text: questionText,
      },
    });
  }

  delete(questionId: string, questionText: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        questionId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete question ${questionText}?`,
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.securityQuestionService
          .deleteSecurityQuestion(questionId)
          .subscribe((res) => {
            console.log(`Question Disabled`);
            this.questions = this.questions.filter((u) => u._id !== questionId);
          });
      }
    });
  }
}
