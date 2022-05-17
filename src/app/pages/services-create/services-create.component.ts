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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css'],
})
export class ServicesCreateComponent implements OnInit {
  form:FormGroup;
  services: any;
  serviceIds:any=[];
  lastId: number;

  constructor(private http: HttpClient, private fb: FormBuilder ,private router: Router) { }

  ngOnInit() {

    this.getServices();
    this.form = this.fb.group({
      id: [{value: this.lastId+1, disabled:true},Validators.compose([Validators.required])],
      title: [null,Validators.compose([Validators.required])],
      price: [null,Validators.compose([Validators.required])],
    });

  }
  // Function that checks input whether character is a number or decimal place.
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getServices(){

    // Http call to get the services and set form fields
    this.http.get('/api/session/services').subscribe(res => {

      this.services = res;

      console.log("services", this.services);
      this.services.forEach((element: { id: string; }) => {
        this.serviceIds.push(parseInt(element.id));
      });
      this.lastId = Math.max.apply(null,this.serviceIds);

      this.form.controls.id.setValue(this.lastId+1);
    },err =>{
      console.log(err);
    });
  }

  // Create the service
  createService(){

    this.http.post('/api/session/services',{
      title:this.form.controls.title.value,
      price:this.form.controls.price.value,
    }).subscribe(res =>{
      this.router.navigate(['/session/services']);
    });

  }

  // Cancel operation
  cancel(){
    this.form.reset();
    this.router.navigate(['/session/services']);
  }


}
