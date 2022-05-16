/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 16 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Services Edit Component
=======================================
*/

// Imported Modules

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {

  //variables
  service: any;
  serviceId: string;
  form: FormGroup;
  curId: string;

  constructor (
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,

    private router: Router

    ) {
      this.serviceId = this.route.snapshot.paramMap.get('serviceId');

      this.http.get(`/api/session/services/${this.serviceId}`).subscribe(res =>{
        this.service = res;
      }, err =>{
        console.log(err);
      },() => {
        this.form.controls.id.setValue(this.service.id);
        this.curId = this.service.id;
        this.form.controls.title.setValue(this.service.title);
        this.form.controls.price.setValue(this.service.price);
      })
   }

   ngOnInit() {

    this.form = this.fb.group({
      id: [{value:this.curId,disabled:true},Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])]
    });
  }

  // Function that checks the input whether character is a number or decimal.
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;
  }

// Saves the service
saveService(){

  this.http.put('/api/session/services/'+ this.serviceId,{
    id: this.form.controls.id.value,
    title:this.form.controls.title.value,
    price:this.form.controls.price.value
  }).subscribe(res =>{
    this.router.navigate(['/session/services']);
  });
}
 // Cancel and route back to the service list
  cancel(){

    this.router.navigate(['/session/services']);
  }
}
