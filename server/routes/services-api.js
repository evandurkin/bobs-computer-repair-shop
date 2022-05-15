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
const Service = require("../models/services");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

const router = express.Router();

/**
 * API: findAll services
 */
router.get("/services", async (req, res) => {
  try {
    Service.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, service) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(
            501,
            "MongoDB Exception",
            err
          );
          res.status(501).send(findAllMongodbErrorResponse.toObject());
        } else {
          console.log(Service);
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
router.get("/services/:id", async (req, res) => {
  try {
    Service.findOne({ _id: req.params.id }, function (err, service) {
      if (err) {
        console.log(err);
        const findLineItemByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findLineItemByIdMongodbErrorResponse.toObject());
      } else {
        console.log(service);
        const findLineItemByIdResponse = new BaseResponse(
          200,
          "Query successful",
          service
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

router.delete("/services/:id", async (req, res) => {
  try {
    Service.findOne({ _id: req.params.id }, function (err, service) {
      if (err) {
        console.log(err);
        const deleteLineItemCatchErrorResponse = new ErrorResponse(
          500,
          "MongoDB Exception Error",
          service
        );
        res.status(500).send(deleteLineItemCatchErrorResponse.toObject());
      } else {
        console.log(service);
        service.set({
          isDisabled: true,
        });

         service.save(function (err, savedService) {
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
router.put("/services/:id", async (req, res) => {
  try {
    // find the service by id
    Service.findOne({ _id: req.params.id }, function (err, service) {
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
        console.log(service);

        service.set({
          title: req.body.title,
          price: req.body.price,
        });

        // save the Service
        service.save(function (err, savedService) {
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
              savedService
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
router.post("/services", async (req, res) => {
  try {
    // service object
    let newLineItem = {
      serviceName: req.body.serviceName,
      price: req.body.price,
      isDisabled: false,
    };
    // create a service based off the service object
    Service.create(newLineItem, function (err, service) {
      // error message
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(createLineItemMongodbErrorResponse.toObject());
      } else {
        // returns json of new service if successful
        console.log(lineItem);
        const createUserResponse = new BaseResponse(
          200,
          "Query successful",
          user
        );
        res.json(createLineItemResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createLineItemCatchErrorResponse = new BaseResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(createLineItemCatchErrorResponse.toObject());
  }
});

module.exports = router;
