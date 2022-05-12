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
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services/services.service';
import { LineItem } from 'src/app/shared/interfaces/line-item';

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
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
    });
  }

  // create new security question
  create(): void {
    const newService: LineItem = {
      title: this.form.controls.title.value,
      price: this.form.controls.price.value,
    };

    this.servicesService.createService(newService).subscribe(
      (res) => {
        this.router.navigate(['/session/services']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // cancel button to close dialog
  cancel(): void {
    this.router.navigate(['/session/services']);
  }
}
