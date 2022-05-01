/*
=====================================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: security question service
=====================================================
*/

import { Injectable } from '@angular/core';
import { SecurityQuestion } from '../interfaces/security-question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityQuestionService {
  constructor(private http: HttpClient) {}

  //service for API: find all security questions
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/session/security-questions');
  }

  //service for API: find security question by ID
  findSecurityQuestionById(questionId: string): Observable<any> {
    return this.http.get('/api/session/security-questions/' + questionId);
  }

  //service for API: create a new security question
  createSecurityQuestion(
    newSecurityQuestion: SecurityQuestion
  ): Observable<any> {
    return this.http.post('/api/session/security-questions', {
      text: newSecurityQuestion.text,
    });
  }

  //service for updating a security question
  updateSecurityQuestion(
    questionId: string,
    updatedSecurityQuestion: SecurityQuestion
  ): Observable<any> {
    return this.http.put('/api/session/security-questions/' + questionId, {
      text: updatedSecurityQuestion.text,
    });
  }

  //service for deleting a security question
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/session/security-questions/' + questionId);
  }
}
