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
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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
}
