/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 11 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the guest services component.
=======================================
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemToInvoiceComponent } from 'src/app/shared/add-item-to-invoice/add-item-to-invoice.component';
import { MatTable } from '@angular/material/table';
import { Invoice } from '../../shared/interfaces/invoice';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceDialogComponent } from '../..//shared/invoice-dialog/invoice-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LineItemsService } from 'src/app/shared/services/line-items.service';
import { PrintDialogComponent } from 'src/app/shared/print-dialog/print-dialog.component';
import { LineItem } from 'src/app/shared/interfaces/line-item';

@Component({
  selector: 'app-guest-services',
  templateUrl: './guest-services.component.html',
  styleUrls: ['./guest-services.component.css']
})
export class GuestServicesComponent implements OnInit {
  displayedColumns: Array<string> = ['name', 'price', 'functions'];

  total: number = 0;
  lineItems: LineItem[];
  @ViewChild(MatTable) table: MatTable<any>;
  dataTableSource = [];
  invoice: Invoice;


  constructor(
    private lineItemsService: LineItemsService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.invoice = new Invoice(cookieService.get('session_user'));

        // Find all service Items
        this.lineItemsService.findAllServices().subscribe(
          (res) => {
            this.lineItems = res['data'];
            console.log(this.lineItems);
          },
          // Error Handling
          (err) => {
            console.log(err);
          }
        );
  }

  ngOnInit(): void { }

  // adds the selected items to the invoice preview
  addToInvoice(title: string, price: number, parts?: number, hours?: number) {
    let newService = {
      title: title,
      price: price,
    };

    // If an add service item, add the parts and hours value to the newService object.
    if (parts) newService['parts'] = parts;
    if (hours) newService['hours'] = hours;

    // Add the newService to the table
    this.dataTableSource.push(newService);
    this.table.renderRows();

    // Add partsAmount and laborAmount to the invoice
    this.invoice.partsAmount += Number(parts) || 0;
    this.invoice.laborHours += Number(hours) || 0;

    if (
      newService['parts'] === undefined &&
      newService['hours'] === undefined
    ) {
      console.log('This is a lineItem!');
      this.invoice.addToLineItems(newService);
    }

    // Add to the invoice total
    this.total += Number(price);

    console.log('-- Invoice after adding --');
    console.log(this.invoice);
  }

  // Resets the home page
  reset() {
    this.dataTableSource = [];
    this.table.renderRows();
    this.total = 0;
    this.invoice.clear();
  }

    // Function called when user clicks the delete icon.
    deleteFromInvoice(
      index: number,
      title: string,
      price: number,
      parts?: number,
      hours?: number
    ) {
      // Delete item from the table
      this.dataTableSource.splice(index, 1);
      this.table.renderRows();

      // Subtract the amount from invoice.partsAmount
      this.invoice.partsAmount -= Number(parts) || 0;

      // Subtract from invoice.laborHours
      this.invoice.laborHours -= Number(hours) || 0;

      // Remove from invoice lineItems
      if (parts === undefined && hours === undefined) {
        this.invoice.removeFromLineItems({
          title: title,
          price: price,
        });
      }

      // Subtract from invoice.total
      this.total -= Number(price);

      console.log('-- Invoice after deletion --');
      console.log(this.invoice);
    }
}
