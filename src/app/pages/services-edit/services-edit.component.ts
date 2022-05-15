/*<!--
    Title: role-details.component.ts
    Date: 07 May 2022
    Authors: Evan Durkin, Keith Hall,
    Gustavo Roo Gonzalez, and Gunner Bradley
    Description: TS file for the role-details component.
-->*/

import { Component, Inject, OnInit } from '@angular/core';
import { LineItem } from '../../shared/interfaces/line-item';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ServicesService } from './../../shared/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css'],
})
export class ServicesEditComponent implements OnInit {
  title: string;
  price: number;
  lineItemData: any;
  servicesForm: FormGroup;
  servicesData: LineItem;
  lineItemId: any;

  constructor(
    private dialogRef: MatDialogRef<ServicesEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.lineItemId = data.LineItemData;
  }

  ngOnInit() {
    console.log(this.lineItemData.text);
    this.servicesForm = new FormGroup({
      title: new FormControl(this.servicesData.title, Validators.required),
      price: new FormControl(this.servicesData.price, Validators.required),
    });
  }

  /**
   * Save updated service
   */
  save() {
    this.dialogRef.close(this.servicesForm.value);
  }

  /**
   * Cancel and go back to service list
   */
  cancel() {
    this.dialogRef.close();
  }
}
