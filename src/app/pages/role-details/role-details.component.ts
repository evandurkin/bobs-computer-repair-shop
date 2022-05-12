/*<!--
    Title: role-details.component.ts
    Date: 07 May 2022
    Authors: Evan Durkin, Keith Hall,
    Gustavo Roo Gonzalez, and Gunner Bradley
    Description: TS file for the role-details component.
-->*/

import { Component, Inject, OnInit } from '@angular/core';
import { UserRole } from '../../shared/interfaces/user-role';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  roleForm: FormGroup;
  roleData: UserRole;
  roleId: string;

  constructor(
    private dialogRef: MatDialogRef<RoleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.roleData = data.roleData
  }

  ngOnInit() {
    console.log(this.roleData.text)
    this.roleForm = new FormGroup({
      text: new FormControl(this.roleData.text, Validators.required)
    })
  }

  /**
   * Save updated role
   */
  save() {
    this.dialogRef.close(this.roleForm.value)
  }

  /**
   * Cancel and go back to role list
   */
  cancel() {
    this.dialogRef.close();
  }
}
