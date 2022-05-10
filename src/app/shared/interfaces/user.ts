/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 21 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: user interface
============================================
*/

import { UserRole } from './user-role';
import { SelectedSecurityQuestion } from './selected-security-question';


// user interface
export interface User {
  _id?: string;
  userName?: string;
  password?: string;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: string;
  role?: UserRole;
  selectedSecurityQuestion?: [SelectedSecurityQuestion];
}
