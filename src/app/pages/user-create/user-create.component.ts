/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 21 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the user-create component.
============================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    // Form validators
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ]),
      ],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      addressLineTwo: [null, Validators.compose([Validators.required])],
      addressLineOne: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zip: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  // Create user
  createUser(): void {
    const newUser: User = {
      userName: this.form.controls.userName.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      addressLineOne: this.form.controls.addressLineOne.value,
      addressLineTwo: this.form.controls.addressLineTwo.value,
      city: this.form.controls.city.value,
      state: this.form.controls.state.value,
      zip: this.form.controls.zip.value,
      email: this.form.controls.email.value,
    };

    // Call service to create user
    this.userService.createUser(newUser).subscribe(

      (res) => {
        this.router.navigate(['/session/users']);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  // Cancel operation
  cancel(): void {
    this.router.navigate(['/session/users']);
  }
}
