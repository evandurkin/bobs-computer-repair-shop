/*
============================================================
// Title: Bob’s Computer Repair Shop
// Date: 5 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for delete service pop-up Component
============================================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-service-dialog',
  templateUrl: './delete-service-dialog.component.html',
  styleUrls: ['./delete-service-dialog.component.css']
})
export class DeleteServiceDialogComponent implements OnInit {

  serviceName: string;
  dialogHeader: string;
  dialogBody: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.serviceName = data.service;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {
  }

}
