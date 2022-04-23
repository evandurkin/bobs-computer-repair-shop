/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: updating user dialog
// Reference: For building forms https://angular-templates.io/tutorials/about/angular-forms-and-validations
=======================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/user';
import { UserRole } from 'src/app/shared/interfaces/user-role';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userInfo: User;
  userRole: UserRole;
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data)
    {
    this.userInfo = data.userInfo;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.userInfo.firstName, Validators.required),
      lastName: new FormControl(this.userInfo.lastName, Validators.required),
      address: new FormControl(this.userInfo.address, Validators.required),
      phoneNumber: new FormControl(this.userInfo.phoneNumber, Validators.required),
      email: new FormControl(this.userInfo.email, Validators.required),
      role: new FormControl(this.userInfo.role, Validators.required)
    })
  }

  // submits the user data updates to the form
  editUser() {
    this.dialogRef.close(this.userForm.value);
  }

  // cancel button to close the editUser dialog
  cancel() {
    this.dialogRef.close
  }

}
