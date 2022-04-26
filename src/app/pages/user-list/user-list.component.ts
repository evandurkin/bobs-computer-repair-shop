/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User List Component
=======================================
*/

// Imported modules
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns = [

    'userName',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'email',
    'functions',
  ];
  constructor( private http: HttpClient,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    // Find all users (account holders)
    this.userService.findAllUsers().subscribe(

      (res) => {
        this.users = res['data'];
        console.log(this.users);
      },
      // Error Handling
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {}

  // Delete
  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {  // Find the selected user by id and open confirmation dialog.
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user: '${recordId}'?`,
      },
      disableClose: true,
      width: '800px',
    });

    // Remove the record upon closing the dialog.
    dialogRef.afterClosed().subscribe((result) => {

      // If the user clicks yes
      if (result === 'confirm') {


        this.userService.deleteUser(userId).subscribe((res) => {
          console.log(`User delete`);
          this.users = this.users.filter((u) => u._id !== userId);
        });
      }
    });
  }
}
