/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Line-Item service for BCRS.
=======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineItem } from '../interfaces/line-item';

@Injectable({
  providedIn: 'root',
})
export class LineItemsService {
  constructor(private http: HttpClient) {}

  // service for API: finding all users
  findAllServices(): Observable<any> {
    return this.http.get('/api/session/services');
  }
}
