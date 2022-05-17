/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 27 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for services.
=======================================
*/

// Require Statements
const express = require("express");
const LineItem = require("../models/line-item");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();

/**
 * API: findAll services
 */
router.get("/", async (req, res) => {
  try {
    LineItem.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, LineItem) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(
            501,
            "MongoDB Exception",
            err
          );
          res.status(501).send(findAllMongodbErrorResponse.toObject());
        } else {
          console.log(LineItem);
          const findAllResponse = new BaseResponse(
            200,
            "Query Successful",
            LineItem
          );
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllByCatchErrorResponse = new ErrorResponse(
      501,
      "MongoDB Exception Error",
      e.message
    );
    res.status(501).send(findAllByCatchErrorResponse.toObject());
  }
});

/**
 * API: Find Service by ID
 */
router.get("/:id", async (req, res) => {
  try {
    LineItem.findOne({ _id: req.params.id }, function (err, lineItem) {
      if (err) {
        console.log(err);
        const findLineItemByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findLineItemByIdMongodbErrorResponse.toObject());
      } else {
        console.log(lineItem);
        const findLineItemByIdResponse = new BaseResponse(
          200,
          "Query successful",
          lineItem
        );
        res.json(findLineItemByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e
    );
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

/**
 * API: Delete service by id
 */

router.delete("/:id", async (req, res) => {
  try {
    LineItem.findOne({ _id: req.params.id }, function (err, lineItem) {
      if (err) {
        console.log(err);
        const deleteLineItemCatchErrorResponse = new ErrorResponse(
          500,
          "MongoDB Exception Error",
          lineItem
        );
        res.status(500).send(deleteLineItemCatchErrorResponse.toObject());
      } else {
        console.log(lineItem);
        lineItem.set({
          isDisabled: true,
        });

        lineItem.save(function (err, savedLineItem) {
          if (err) {
            console.log(err);
            const savedLineItemMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.status(500).send(savedLineItemMongodbErrorResponse.toObject());
          } else {
            console.log(err);
            const deleteLineItemResponse = new BaseResponse(
              200,
              "Query successful",
              savedLineItem
            );
            res.json(deleteLineItemResponse);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteLineItemCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(501).send(deleteLineItemCatchErrorResponse.toObject());
  }
});

/**
 * API: Update Service by ID
 */
router.put("/:id", async (req, res) => {
  try {
    // find the service by id
    LineItem.findOne({ _id: req.params.id }, function (err, lineItem) {
      // on error
      if (err) {
        console.log(err);
        const updateLineItemMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(updateLineItemMongodbErrorResponse.toObject());
        // update service if found
      } else {
        console.log(lineItem);

        lineItem.set({
          title: req.body.title,
          price: req.body.price,
        });

        // save the Service
        lineItem.save(function (err, savedLineItem) {
          // on error
          if (err) {
            console.log(err);
            const saveLineItemMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.status(500).send(saveLIneItemMongodbErrorResponse.toObject());
            // save if valid
          } else {
            console.log(savedLineItem);
            const saveLineItemResponse = new BaseResponse(
              200,
              "Query successful",
              savedLineItem
            );
            res.json(saveLineItemResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    // catch error
    console.log(e);
    const updateLineItemCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(updateLineItemCatchErrorResponse.toObject());
  }
});

// create service API
router.post('/', function(req,res,next){
  let newLineItem = {

      title: req.body.title,
      price: req.body.price
  };
  LineItem.create(newLineItem,function(err,lineItem){
      if(err){
          console.log(err);
          return next(err);
      }
      else{
          console.log(lineItem);
          res.json(lineItem);
      }
  })
});

module.exports = router;
