/*
=====================================================
// Title: Bob’s Computer Repair Shop
// Date: 5 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: services list service
=====================================================
*/

import { Injectable } from '@angular/core';
import { LineItem } from '../interfaces/line-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  //service for API: find all service
  findAllServices(): Observable<any> {
    return this.http.get('/api/session/services');
  }

  //service for API: find service by ID
  findServiceById(lineItemId: string): Observable<any> {
    return this.http.get('/api/session/services/' + lineItemId);
  }

  //service for API: create a new service
  createService(
    newService: LineItem
  ): Observable<any> {
    return this.http.post('/api/session/services', {
      serviceName: newService.serviceName,
      price: newService.price
    });
  }

  //service for updating a service
  updateService(
    lineItemId: string,
    updatedService: LineItem
  ): Observable<any> {
    return this.http.put('/api/session/services/' + lineItemId, {
      serviceName: updatedService.serviceName
    });
  }

  //service for deleting a service
  deleteService(lineItemId: string): Observable<any> {
    return this.http.delete('/api/session/services/' + lineItemId);
  }
}
