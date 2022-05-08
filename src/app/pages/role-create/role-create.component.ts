// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
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

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  create() {
    const newRole = {
      text: this.form.controls['text'].value,
    } as UserRole;

    this.roleService.createRole(newRole).subscribe(
      (res) => {
        this.router.navigate(['/session/role-list']);
      },
      (err) => {
        console.log(err);
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
      }
    );
  }
  cancel() {
    this.router.navigate(['/session/role-list']);
  }
}
