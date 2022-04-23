import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // service for API: finding all users
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  // service for API: finding a user by their ID
  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId)
  }

  // service for API: creating a new user
  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber
    })
  }

  //service for API: updating a user
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    })
  }

  //service for API: deleting a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
