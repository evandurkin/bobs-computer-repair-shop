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
router.post("/session/sign-in", async (req, res) => {
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

// Verify Users
router.get("/session/verify/users/:userName", async (req, res) => {
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

router.post("/session/users/:userName/reset-password", async (req, res) => {
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

/**
 * verifySecurityQuestions
 */
router.post("/session/verify/users/:userName/security-questions", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      // Find by user name

      // Error response
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res
          .status(500)
          .send(verifySecurityQuestionsMongodbErrorResponse.toObject());

        // Success response
      } else {
        console.log(user);
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
          (q) => q.questionText === req.body.questionText1
        );
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
          (q2) => q2.questionText === req.body.questionText2
        );
        const selectedSecurityQuestionThree =
          user.selectedSecurityQuestions.find(
            (q3) => q3.questionText === req.body.questionText3
          );

        // Validate matching answers
        const isValidAnswerOne =
          selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo =
          selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree =
          selectedSecurityQuestionThree.answerText === req.body.answerText3;

        // If answers match
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(
            `User ${user.userName} answered their security questions correctly`
          );
          const validSecurityQuestionsResponse = new BaseResponse(
            "200",
            "success",
            user
          );
          res.json(validSecurityQuestionsResponse.toObject());
        } else {
          console.log(
            `User ${user.userName} did not answer their security questions correctly`
          );
          const invalidSecurityQuestionsResponse = new ErrorResponse(
            "200",
            "Error: incorrect answers",
            user
          );
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
    // Catch error
  } catch (err) {
    console.log(err);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

// Register new user API
router.post("/session/register", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const registerUserMongoDbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(registerUserMongoDbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            text: "Standard",
          };

          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            addressLineOne: req.body.addressLineOne,
            addressLineTwo: req.body.addressLineTwo,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions,
          };

          User.create(registeredUser, function (err, newUser) {
            if (err) {
              console.log(err);
              const newUserMongoDbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(newUserMongoDbErrorResponse.toObject());
            } else {
              console.log(newUser);
              const newUserResponse = new BaseResponse(
                "200",
                "Query successful",
                newUser
              );
              res.json(newUserResponse.toObject());
            }
          });
        } else {
          console.log(
            "This username already exists. Please choose a different username."
          );
          const userExistsErrorResponse = new BaseResponse(
            "200",
            "This username already exists. Please choose a different username.",
            err
          );
          res.status(200).send(userExistsErrorResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
