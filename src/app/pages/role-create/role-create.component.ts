/* <!--
    Title: role-create.component.ts
    Date: 07 May 2022
    Authors: Evan Durkin, Keith Hall,
    Gustavo Roo Gonzalez, and Gunner Bradley
    Description: TS file for the role-create component.
-->*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
import { User } from 'src/app/shared/interfaces/user';
import { RoleService } from '../../../app/shared/services/role.service';
import { UserRole } from '../../shared/interfaces/user-role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  create(): void {
    const newRole: UserRole = {
      text: this.form.controls.text.value,

    }

    this.roleService.createRole(newRole).subscribe
      (res => {
        this.router.navigate(['/session/role-list']);
      },
      (err) => {
        console.log(err);})
      }

  cancel() {
    this.router.navigate(['/session/role-list']);
  }
}
