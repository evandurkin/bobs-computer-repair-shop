/*
===================================================
// Title: Bob’s Computer Repair Shop
// Date: 1 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Model for user roles.
===================================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema(
  {
    text: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "roles" }
);

module.exports = mongoose.model("Role", roleSchema);
