/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 4 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for invoice
=======================================
*/

// Require statements
const express = require("express");
const Invoice = require("../models/invoice");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

const router = express.Router();

// create invoice API
router.post("/:userName", async (req, res) => {

  try {

    const newInvoice = {
      userName: req.params.userName,
      lineItem: req.body.lineItem,
      partsTotal: req.body.partsTotal,
      laborTotal: req.body.laborTotal,
      total: req.body.total,
      created: req.body.created,
    };

    console.log(newInvoice);

    Invoice.create(newInvoice, function (err, invoice) {

      if (err) {
        console.log(err);
        const createInvoiceErrorResponse = new ErrorResponse(
          "500",
          "Internal Server Error",
          err
        );
        res.status(500).send(createInvoiceErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse(
          "200",
          "Query Successful",
          invoice
        );
        res.json(createInvoiceResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});
module.exports = router;
