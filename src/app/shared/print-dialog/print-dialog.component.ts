/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the print-dialog component.
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-invoice-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.css']
})
export class PrintDialogComponent implements OnInit {

  done: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PrintDialogComponent>
  ) { }

  ngOnInit(): void {
     setTimeout( () => {
       this.done = true;
         setTimeout( () => { this.close(); }, 750)}, 2000)
  }

  close() {
    this.dialogRef.close();
  }
}
