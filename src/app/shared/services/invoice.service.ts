/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 4 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS Service for invoice
=======================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(private http: HttpClient) { }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post(`/api/invoices/${userName}`, {
      userName: userName,
      lineItems: invoice.getLineItems(),
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.getLaboutAmount(),
      lineItemTotal: invoice.getLineItemTotal(),
      total: invoice.getTotal()
    })
  }

  findPurchasesByServiceGraph(): Observable<any> {
    return this.http.get(`/api/invoices/purchases-graph`);
  }
}
