/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 5 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: invoice interface
============================================
*/

import { LineItem } from "./line-item";

export interface Invoice {
  userName: string;
  lineItem: LineItem[];
  partsTotal: number;
  laborTotal: number;
  total: number;
  created: Date;
}
