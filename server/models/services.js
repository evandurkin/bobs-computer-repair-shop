/*
===================================================
// Title: Bob’s Computer Repair Shop
// Date: 4 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Model for services.
===================================================
*/
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ServiceSchema = new Schema(
  {
    title: { type: String },
    price: { type: Number },
    isDisabled: { type: Boolean, default: false },
  },
  {
    collection: "services",
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
