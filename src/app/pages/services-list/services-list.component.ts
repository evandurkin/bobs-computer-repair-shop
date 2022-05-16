/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 5 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Services List Component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteServiceDialogComponent } from 'src/app/shared/delete-service-dialog/delete-service-dialog.component';
import { ServicesService } from 'src/app/shared/services/services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: any;
  displayedColumns = ['title', 'price', 'functions'];

  constructor(
    private dialog: MatDialog,
    private servicesService: ServicesService,
    private http: HttpClient

  ) {
    this.http.get('/api/session/services').subscribe(res =>{

      this.services =  res['data'];
      console.log(this.services);
    },err =>{
      console.log(err);
    })
   }

  ngOnInit(): void {}

  // delete question dialog box
  delete(lineItemId: string, serviceName: string): void {
    const dialogRef = this.dialog.open(DeleteServiceDialogComponent, {
      data: {
        lineItemId,
        dialogHeader: 'Delete Service Dialog',
        dialogBody: `Are you sure you want to delete the ${serviceName} service?`,
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.servicesService
          .deleteService(lineItemId)
          .subscribe((res) => {
            console.log(`Service Disabled`);
            // this.services = this.services.filter((u) => u._id !== lineItemId);
          });
      }
    });
  }

}
