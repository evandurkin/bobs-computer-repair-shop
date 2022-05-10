/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the add-item-to-invoice component.
=======================================
*/

// Import statements
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from '../interfaces/invoice';

@Component({
  selector: 'app-add-item-to-invoice',
  templateUrl: './add-item-to-invoice.component.html',
  styleUrls: ['./add-item-to-invoice.component.css']
})
export class AddItemToInvoiceComponent implements OnInit {


  addItemToForm: FormGroup;
  service: { title: any; parts: any; hours: any; price: number; };

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddItemToInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

// Validators
  ngOnInit(): void {
    this.addItemToForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      hours: [null, Validators.compose([Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      parts: [null, Validators.compose([Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])]
    })
  }

  createService() {
    const HOURLY_RATE = 50;
    const formValue = this.addItemToForm.value;

    const hourlyTotal = formValue.hours * HOURLY_RATE;


    // Assemble item to be passed in
    this.service = {
      title: formValue.name,
      parts: formValue.parts,
      hours: formValue.hours,
      price: Number(hourlyTotal) + Number(formValue.parts)
    }

    // Close dialog and pass in user item
    this.matDialogRef.close(this.service);
  }

  // Cancels open dialog
  cancelDialog() {
    this.matDialogRef.close()
  }
}
