/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Session API's for BCRS App.
=======================================
*/

// Imported Modules
const express = require("express");
const User = require("../models/user");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const bcrypt = require("bcrypt");

const router = express.Router();

const saltRounds = 10; // Salt rounds for hashing algorithm

// User sign-in api
router.post("/sign-in", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signInErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(signInErrorResponse.toObject());
      } else {
        console.log(user);

        // If the username is valid, compare the requestBody password with the user's saved password.
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          // If the password is valid
          if (passwordIsValid) {
            console.log("Login Successful");

            const signInResponse = new BaseResponse(
              200,
              "Login successful",
              user
            );
            res.json(signInResponse.toObject());
          } else {
            // If the password is not valid
            console.log(`Invalid password for username: ${user.userName}`);

            const invalidPasswordResponse = new ErrorResponse(
              401,
              "Invalid user name and/or password, please try again",
              null
            );
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        } else {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new ErrorResponse(
            401,
            "Invalid user name and/or password, please try again",
            null
          );
          res.status(401).send(invalidUserNameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signInCatchErrorResponse = new ErrorResponse(
      501,
      "MongoDB Exception",
      e.message
    );
    res.status(500).send(signInCatchErrorResponse.toObject());
  }
});
module.exports = router;
