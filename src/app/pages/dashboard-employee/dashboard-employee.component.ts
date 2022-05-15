/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the dashboard-employee component.
=======================================
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddItemToInvoiceComponent } from 'src/app/shared/add-item-to-invoice/add-item-to-invoice.component';
import { MatTable } from '@angular/material/table';
import { Invoice } from '../../shared/interfaces/invoice';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceDialogComponent } from '../..//shared/invoice-dialog/invoice-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PrintDialogComponent } from 'src/app/shared/print-dialog/print-dialog.component';


@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css'],
  providers: [MessageService],
})
export class DashboardEmployeeComponent implements OnInit {
  displayedColumns: Array<string> = ['name', 'price', 'functions'];

  total: number = 0;
  products: Array<Product>;
  @ViewChild(MatTable) table: MatTable<any>;
  dataTableSource = [];
  invoice: Invoice;

  constructor(
    private messageService: MessageService,
    private dialog: MatDialog,
    private http: HttpClient,
    private cookieService: CookieService,
    private productService: ProductService
  ) {

    this.products = productService.getProducts();
    this.invoice = new Invoice(cookieService.get('session_user'));
  }

  ngOnInit(): void {}

  // Opens the add a service dialog.

  addServiceDialog(): void {
    let dialogRef = this.dialog.open(AddItemToInvoiceComponent, {
      disableClose: true
    });

    // Add the new item to the data table and invoice
    dialogRef.afterClosed().subscribe(service => {

      if (service) {

        this.addToInvoice(
          service.title,
          service.price,
          service.parts,
          service.hours
        );

        console.log('-- invoice after dialog close --');
        console.log(this.invoice);
      }
    });
  };

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

  // Creates an invoice and shows the invoice summary
  getInvoice() {
    // Adds invoice to database
    this.http
      .post('/api/invoices/' + this.cookieService.get('session_user'), {
        lineItems: this.invoice.getLineItems(),
        partsAmount: this.invoice.partsAmount,
        laborAmount: this.invoice.getLaborAmount(),
        lineItemTotal: this.invoice.getLineItemTotal(),
        total: this.invoice.getTotal(),
      })
      .subscribe(
        (res) => {
          // Success Toast
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Created invoice with the amount of $${
              Math.round((this.invoice.getTotal() + Number.EPSILON) * 100) / 100
            }`,
          });
          // Open Invoice Summary Dialog
          let dialogRef = this.dialog.open(InvoiceDialogComponent, {
            width: '550px',
            data: this.invoice,
            disableClose: true,
          });

          // When dialog is closed
          dialogRef.afterClosed().subscribe((res) => {
            // Reset the invoice
            this.reset();
          });
        },
        (err) => {
          console.log(err);
        }
      );
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
