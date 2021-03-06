/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 3 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Line item schema for BCRS.
=======================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  isDisabled: { type: Boolean },
});

module.exports = lineItemSchema;
