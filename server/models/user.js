/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date:
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User Schema and model.
=======================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selectedSecurityQuestionsSchema = require("../schemas/selected-security-questions");

// Defines the structure of the User document.
var userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: { type: String, default: 'standard' },
    selectedSecurityQuestion: [selectedSecurityQuestionsSchema],
    date_created: { type: Date, default: new Date() },
    date_updated: { type: Date },
  },

  { collection: "users" }
);

//Wraps and exports the userSchema as a model for use in the application.
module.exports = mongoose.model("User", userSchema);
