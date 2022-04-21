/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for users.
=======================================
*/

// Require Statements
const express = require('express');
const User = require('../models/user');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

// findAllUsers API
router.get('/', async (req, res) => {

    try {

      //Finds and returns all users as an array
      User.find({}).where('isEnabled').equals(true).exec(function (error, users) {

		  // Error handling
          if (error) {

            console.log(error);
            const serverError = new ErrorResponse(500, "Internal server error", error); // Create a variable and instantiate the errorResponse class.
            res.status(500).send(serverError.toObject());  // Convert values in the response to native objects.

          } else {

			  // Return all users
            console.log(users);
            const queryResponse = new BaseResponse(200, "MongoDB query was successful", users); // Instantiate baseResponse and convert values to native objects.
            res.json(queryResponse.toObject());
        }
      })

    } catch (e) {
      console.log(e);
      res.status(501).send(new ErrorResponse(501,
        "MongoDB Exception", e.message).toObject());
    }

  });

  module.exports = router;
