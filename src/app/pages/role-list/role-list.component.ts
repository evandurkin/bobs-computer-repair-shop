/*
    Title: role-list.component.ts
    Date: 07 May 2022
    Authors: Evan Durkin, Keith Hall,
    Gustavo Roo Gonzalez, and Gunner Bradley
    Description: TS file for the role-list component.
*/

import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../shared/interfaces/user-role';
import { RoleService } from '../../shared/services/role.service';
import { Message } from 'primeng/api/message';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleDetailsComponent } from '../role-details/role-details.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roles: UserRole[];
  displayedColumns = ['role', 'functions'];
  errorMessages: Message[];

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog
    )
    {
    this.roleService.findAllRoles().subscribe((res) => {
      this.roles = res.data;
      console.log(this.roles);
    },
    (err) => {
      console.log(err);
    });
  }

  ngOnInit(): void {}

  openRoleDetailsDialog(id, role) {
    const dialogRef = this.dialog.open(RoleDetailsComponent, {
      disableClose: true,
      data: {
        roleData: role
      },
      height: '300px',
      width: '550px'
    });

    // after the dialog is closed the question data is added
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(data)
        this.roleService.updateRole(id, data).subscribe(() => {
          console.log("Role has been updated!");
          this.roleService.findAllRoles().subscribe(res => {
            this.roles = res.data;
            console.log(this.roles);
          }, err => {
            console.log(err);
          });
        })
      }
    })
  }

  delete(roleId: string, text: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role: ${text}?`,
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(
          (res) => {
            console.log('Role disabled');
            this.roles = this.roles.filter((role) => role._id !== roleId);
          },
          (err) => {
            this.errorMessages = [
              { severity: 'error', summary: 'Error', detail: err.message },
            ];
          }
        );
      }
    });
  }
}
