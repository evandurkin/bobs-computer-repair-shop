/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 21 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: TS file for the user-update component.
============================================
*/

// Imported Modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';
import { UserRole } from '../../shared/interfaces/user-role';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: UserRole[];

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
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role['role']);

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
      email: [null, Validators.compose([Validators.required, Validators.email]),],
      role: [null, Validators.compose([Validators.required])],
    });
  }
  saveUser(): void {

    // Get form values
    const updatedUser: User = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      role: this.form.controls.role.value,
    };

    console.log('savedUser object');
    console.log(updatedUser);

    // Update the user
    this.userService.updateUser(this.userId, updatedUser).subscribe(

      (res) => {
        // Route to the users -list component
        this.router.navigate(['/session/users']);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  // Cancel
  cancel(): void {
    this.router.navigate(['/session/users']);
  }
}
