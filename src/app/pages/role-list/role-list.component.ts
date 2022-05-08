import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../shared/interfaces/user-role';
import { RoleService } from '../../shared/services/role.service';
import { Message } from 'primeng/api/message';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roles: UserRole[];
  displayedColumns = ['name', 'functions'];
  errorMessages: Message[];

  constructor(private roleService: RoleService, private dialog: MatDialog) {
    this.roleService.findAllRoles().subscribe((res) => {
      this.roles = res.data;
      console.log(this.roles);
    });
  }

  ngOnInit(): void {}

  delete(roleId, text) {
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
            console.log('Role deleted');
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
