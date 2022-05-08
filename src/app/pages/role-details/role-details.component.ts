/*<!--
    Title: role-details.component.ts
    Date: 07 May 2022
    Authors: Evan Durkin, Keith Hall,
    Gustavo Roo Gonzalez, and Gunner Bradley
    Description: TS file for the role-details component.
-->*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { UserRole } from '../../shared/interfaces/user-role';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: UserRole;
  roleId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {
    // get the roleId
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    // retrieve the role with roleId
    this.roleService.findRoleById(this.roleId).subscribe(
      (res) => {
        this.role = res['data'];
        // on error
      },
      (err) => {
        console.log(err);
        // show the selected role on the form
      },
      () => {
        this.form.controls['text'].setValue(this.role.text);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * Save updated role
   */
  save() {
    // get the new role from the form
    const updatedRole = {
      text: this.form.controls['text'].value,
    } as UserRole;

    // update the role
    this.roleService.updateRole(this.roleId, updatedRole).subscribe(
      (res) => {
        this.router.navigate(['/session/role-list']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Cancel and go back to role list
   */
  cancel() {
    this.router.navigate(['/session/role-list']);
  }
}
