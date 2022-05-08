/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 21 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for users.
=======================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userAddressSchema = new Schema({
  addressLineOne: { type: String },
  addressLineTwo: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
});

module.exports = userAddressSchema;
