/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 11 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Services Graph Component
=======================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-services-graph',
  templateUrl: './services-graph.component.html',
  styleUrls: ['./services-graph.component.css'],
})
export class ServicesGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    this.invoiceService.findPurchasesByServiceGraph().subscribe(
      (res) => {
        this.purchases = res.data;

        for (const item of this.purchases) {
          this.labels.push(item._id.title);
          this.itemCount.push(item.count);
        }

        this.data = {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7',
              ],
              hoverBackgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7',
              ],
              data: this.itemCount,
            },
          ],
        };
        console.log('Data object');
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
