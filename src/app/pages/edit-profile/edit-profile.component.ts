/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 16 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the edit-profile component.
============================================
*/

// Imported Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

import { User } from '../../shared/interfaces/user';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,


  ) {
    // Retrieve user id from the url
    this.userId = this.route.snapshot.paramMap.get('userId');

    // Angular Service finds user by id.
    this.userService.findUserById(this.userId).subscribe(

      (res) => {

        this.user = res['data'];
      },
      // Error handling
      (err) => {
        console.log(err); // Log the error
      },
      () => {
        this.form.controls.firstName.setValue(this.user.firstName);
        this.form.controls.lastName.setValue(this.user.lastName);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.addressLineOne.setValue(this.user.addressLineOne);
        this.form.controls.addressLineTwo.setValue(this.user.addressLineTwo);
        this.form.controls.city.setValue(this.user.city);
        this.form.controls.state.setValue(this.user.state);
        this.form.controls.zip.setValue(this.user.zip);


        console.log(this.user);



      }
    );
  }

  ngOnInit(): void {

    // Form validators
    this.form = this.fb.group({

      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      addressLineOne: [null, Validators.compose([Validators.required])],
      addressLineTwo: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      zip: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email]),],

    });
  }
  updateUser(): void {

    // Get form values
    const updatedUser: User = {
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

    console.log('savedUser object');
    console.log(updatedUser);

    // Update the user
    this.userService.updateUser(this.userId, updatedUser).subscribe(

      (res) => {
        // Route to the users -list component
        this.router.navigate(['/session-employee/user-profile']);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  // Cancel
  cancel(): void {
    this.router.navigate(['/session-employee/user-profile']);
  }
}
