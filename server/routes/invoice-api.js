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
      lineItems: req.body.lineItems,
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

/*
 * findPurchasesByService
 */

router.get("/purchases-graph", async (req, res) => {
  try {
    Invoice.aggregate(
      [
        {
          $unwind: "$lineItems",
        },
        {
          $group: {
            _id: {
              title: "$lineItems.title",
              price: "$lineItems.price",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.title": 1,
          },
        },
      ],
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchasesByServiceErrorResponse = new ErrorResponse(
            "500",
            "Internal Server Error",
            err
          );
          res.status(500).json(findPurchasesByServiceErrorResponse.toObject());
        } else {
          console.log(purchaseGraph);
          const findPurchasesByServiceResponse = new BaseResponse(
            "200",
            "Query Successful",
            purchaseGraph
          );
          res.status(200).json(findPurchasesByServiceResponse.toObject());
        }
      }
    );
  } catch (e) {
    console.log(e);
    const ErrorMessage = new ErrorResponse("500", "Internal Server Error", e);
    res.status(500).json(ErrorMessage.toObject());
  }
});

module.exports = router;
