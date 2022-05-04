/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Role service for BCRS.
=======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRole } from '../interfaces/user-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  // Get all roles
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  // Get role by id
  findRoleById(roleId: string): Observable<any> {
    return this.http.get(`api/roles/${roleId}`);
  }

  // Create new role
  createRole(role: UserRole): Observable<any> {
    return this.http.post(`api/roles`, {
      text: role.text,
    });
  }

  // Update role
  updateRole(roleId: string, role: UserRole): Observable<any> {
    return this.http.put(`api/roles/${roleId}`, {
      text: role.text,
    });
  }

  // Delete role
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`api/roles/${roleId}`);
  }

  // Find user role by user id
  findUserRole(userName: string): Observable<any> {
    return this.http.get(`api/users/${userName}/role`);
  }
}
