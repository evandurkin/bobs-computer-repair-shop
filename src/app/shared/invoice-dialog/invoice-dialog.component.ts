/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the invoice-dialog component.
============================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineItem } from '../interfaces/line-item';
import { PrintDialogComponent } from '../print-dialog/print-dialog.component';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})

export class InvoiceDialogComponent implements OnInit {

  //Variables for different elements of the invoice
  partsAmount: number;
  laborAmount: number;
  date: string;
  displayedColumns: Array<string> = ['name', 'price']
  lineItems : Array<LineItem>;
  total: number;

  constructor(

    @Inject(MAT_DIALOG_DATA) private data,
    private matDialogRef: MatDialogRef<InvoiceDialogComponent>,
    private dialog: MatDialog
  ) {
    console.log('-- Inside dialog component --');
    console.log(data);

    //Get amounts for specific elements of the invoice
    this.partsAmount = data.partsAmount;
    this.laborAmount = data.getLaborAmount();
    this.date = data.getOrderDate();
    this.lineItems = data.getLineItems();
    this.total = data.getTotal();
  }

  ngOnInit(): void {
  }


  // Print invoice function that calls the Print-invoice component.
  printInvoice() {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      width: '280px',
      disableClose: true
    });
  }

}
