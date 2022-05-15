/*
===============================================
// Title: Bob’s Computer Repair Shop
// Date: 12 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for creating a service
===============================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LineItem } from '../../shared/interfaces/line-item';
import { ServicesService } from './../../shared/services/services.service';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css'],
})
export class ServicesCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    // Form validators
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
    });
  }

  // Create service
  createService(): void {
    const newService: LineItem = {
      title: this.form.controls.title.value,
      price: this.form.controls.price.value,
    };

    // Call service to create Service
    this.servicesService.createService(newService).subscribe(
      (res) => {
        this.router.navigate(['/session/services']);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  // Cancel operation
  cancel(): void {
    this.router.navigate(['/session/services']);
  }
}
