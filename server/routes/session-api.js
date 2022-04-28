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

// start here
// findAllUsers API
router.get("/", async (req, res) => {
  try {
    //Finds and returns all users as an array
    User.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (error, users) {
        // Error handling
        if (error) {
          console.log(error);
          const serverError = new ErrorResponse(
            "500",
            "Internal server error",
            error
          ); // Create a variable and instantiate the errorResponse class.
          res.status(500).send(serverError.toObject()); // Convert values in the response to native objects.
        } else {
          // Return all users
          console.log(users);
          const queryResponse = new BaseResponse(
            "200",
            "MongoDB query was successful",
            users
          ); // Instantiate baseResponse and convert values to native objects.
          res.json(queryResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        new ErrorResponse("500", "Internal server error", e.message).toObject()
      );
  }
});

// findAllByID API
router.get("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const findByIdResponse = new BaseResponse(
          200,
          "Query successful",
          user
        );
        res.json(findByIdResponse.toObject());
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

// Verify Users
router.get("/verify/users/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      // Error processing query
      if (err) {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal service error",
          err
        );
        return res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      }
      // Successful query
      else {
        // No user found
        if (!user) {
          const invalidUsernameResponse = new BaseResponse(
            "400",
            "Invalid username",
            req.params.userName
          );
          return res.status(400).send(invalidUsernameResponse.toObject());
        }
        // User exists
        else {
          console.log(user);
          const userVerifiedResponse = new BaseResponse(
            "200",
            "User verified",
            user
          );
          return res.status(200).send(userVerifiedResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e.message);
    const verifyUserCatchResponse = new ErrorResponse(
      "500",
      "Internal service error",
      e.message
    );
    return res.status(500).send(verifyUserCatchResponse.toObject());
  }
});

/**
 * ResetPassword
 */

router.post("/users/:userName/reset-password", async (req, res) => {
  try {
    const password = req.body.password; // Set new password in req.body as a variable.

    // Find username in MongoDB
    User.findOne({ userName: req.params.userName }, function (err, user) {
      //Error Response
      if (err) {
        console.log(err);

        const resetPasswordMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());

        // If user is found
      } else {
        console.log(user);

        let hashedPassword = bcrypt.hashSync(password, saltRounds); // Salt/hash the password

        // Update user password
        user.set({
          password: hashedPassword,
        });

        // Save new password
        user.save(function (err, updatedUser) {
          // Error Response
          if (err) {
            console.log(err);

            const updatedUserMongodbErrorResponse = new ErrorResponse(
              "500",
              "Internal server error",
              err
            );
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
          } else {
            console.log(updatedUser);

            // If query is successful
            const updatedPasswordResponse = new BaseResponse(
              "200",
              "Query successful",
              updatedUser
            );
            res.json(updatedPasswordResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse(
      "500",
      "Internal server error",
      e
    );
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});
module.exports = router;
