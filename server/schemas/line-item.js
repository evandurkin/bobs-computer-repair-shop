/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Line item schema for BCRS.
=======================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let lineItemSchema = new Schema({
  serviceName: { type: String },
  price: { type: Number },
});

module.exports = lineItemSchema;
