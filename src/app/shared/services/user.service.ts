/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User service for BCRS.
=======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // service for API: finding all users
  findAllUsers(): Observable<any> {
    return this.http.get('/api/session/users');
  }
  // service for API: finding a user by their ID
  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/session/users/' + userId);
  }

  // service for API: creating a new user
  createUser(user: User): Observable<any> {
    return this.http.post('/api/session/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
	  role: user.role,
      selectedSecurityQuestion: user.selectedSecurityQuestion,
    });
  }

  //service for API: updating a user
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/session/users' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  }

  //service for API: deleting a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/session/users/' + userId);
  }
}
