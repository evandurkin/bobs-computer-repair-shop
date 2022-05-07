/*
===================================================
// Title: Bob’s Computer Repair Shop
// Date: 14May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Model for invoices.
===================================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lineItemSchema = require("../schemas/line-item");

let invoiceSchema = new Schema(
  {
    lineItem: [lineItemSchema],
    partsTotal: { type: Number },
    laborTotal: { type: Number },
    total: { type: Number },
    username: { type: String },
    created: { type: Date },
    isDisabled: { type: Boolean, default: false },
  },
  {
    collection: "invoices",
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
