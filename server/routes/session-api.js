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

// createUser API
router.post("/", async (req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
    standardRole = {
      role: "standard",
    };

    // user object
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole,
      isDisabled: false,
    };
    // create a new user based off the user object
    User.create(newUser, function (err, user) {
      // error message
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } else {
        // returns json of new user if successful
        console.log(user);
        const createUserResponse = new BaseResponse(
          200,
          "Query successful",
          user
        );
        res.json(createUserResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new BaseResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

// delete user API
router.delete("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongoDbErrorResponse = new ErrorResponse(
          501,
          "MongoDB Exception Error",
          err
        );
        res.status(501).send(deleteUserMongoDbErrorResponse.toObject());
      } else {
        console.log(user);
        user.set({ isDisabled: true });
        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongoDbErrorResponse = new ErrorResponse(
              500,
              "Internal Server Error",
              err
            );
            res.status(500).send(savedUserMongoDbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const deleteUserResponse = new BaseResponse(
              200,
              "User successfully deleted",
              user
            );
            res.json(deleteUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal Server Error",
      e.message
    );
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
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
