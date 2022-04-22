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

// user schema that defines role and sets the default to standard
let userRoleSchema = new Schema({
  text: { type: String, default: "Standard" },
});

module.exports = userRoleSchema;
