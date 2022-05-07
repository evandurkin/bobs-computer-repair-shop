/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 5 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Security Question List Component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteServiceDialogComponent } from 'src/app/shared/delete-service-dialog/delete-service-dialog.component';
import { ServicesService } from 'src/app/shared/services/services.service';
import { LineItem } from 'src/app/shared/interfaces/line-item';
import { ServicesEditComponent } from 'src/app/pages/services-edit/services-edit.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: LineItem[];
  displayedColumns = ['serviceName', 'price', 'functions'];

  constructor(
    private dialog: MatDialog,
    private servicesService: ServicesService
  ) {
    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.services = res['data'];
        console.log('Services data ' + this.services);
      }, (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  // opens the update-question dialog box
  openEditServiceDialog(id, service) {
    const dialogRef = this.dialog.open(ServicesEditComponent, {
      disableClose: true,
      data: {

      },
      height: '300px',
      width: '550px'
    });

    // after the dialog is closed the question data is added
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(data)
        this.servicesService.updateService(id, data).subscribe(() => {
          console.log("Service has been updated!");
          this.servicesService.findAllServices().subscribe(res => {
            this.services = res.data;
            console.log(this.services);
          }, err => {
            console.log(err);
          });
        })
      }
    })
  }

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
