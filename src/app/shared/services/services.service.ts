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
import { Service } from '../interfaces/service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  //service for API: find all service
  findAllServices(): Observable<any> {
    return this.http.get('/api/services');
  }

  //service for API: find service by ID
  findServiceById(ServiceId: string): Observable<any> {
    return this.http.get(`/api/services/${ServiceId}`);
  }

  //service for API: create a new service
  createService(
    newService: LineItem
  ): Observable<any> {
    return this.http.post('/api/services', {
      title: newService.title,
      price: newService.price
    });
  }

  //service for updating a service
  updateService(
    ServiceId: string,
    updatedService: LineItem
  ): Observable<any> {
    return this.http.put('/api/services/' + ServiceId, {
      title: updatedService.title
    });
  }

  //service for deleting a service
  deleteService(ServiceId: string): Observable<any> {
    return this.http.delete('/api/services/' + ServiceId);
  }
}
