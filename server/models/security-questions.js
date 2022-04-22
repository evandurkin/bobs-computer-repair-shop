/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User Schema for BCRS App.
=======================================
*/

// Require Statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CreateSecurityQuestion Schema
let securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "security-questions" }
);

// Export Module
module.exports = mongoose.model("SecurityQuestion", securityQuestionSchema);
