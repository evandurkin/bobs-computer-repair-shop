/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for security questions.
=======================================
*/

const express = require('express');
const SecurityQuestion = require('../models/security-questions');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

/**
 * API: findAllSecurityQuestions goes here
*/




/**
 * API: createSecurityQuestions goes here
*/



// Updates security question object
router.put('/:id', async(req, res) => {

  try {

  // Identifies security question record by id.
   SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {

    // Error handling
     if (err) {
       console.log(err);

       const updateSecurityQuestionErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
       res.status(500).send(updateSecurityQuestionErrorResponse.toObject());

    // Update the record
     } else {
         console.log(securityQuestion);

         securityQuestion.set({
           text: req.body.text
         });

         // Save new security question and the update record
         securityQuestion.save(function(err, savedSecurityQuestion) {

          // Error handling
           if (err) {
             console.log(err);

             const SavedSecurityQuestionErrorResponse = new ErrorResponse(500, "Internal Server Error", err);
             res.status(500).send(SavedSecurityQuestionErrorResponse.toObject());

           } else {
             console.log(savedSecurityQuestion);

             const updateSecurityQuestionBaseResponse = new BaseResponse(200, "Update was successful", savedSecurityQuestion);
             res.json(updateSecurityQuestionBaseResponse.toObject());
           }
         });
     }
   });
  } catch (e) {
     console.log(e);

     const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(501, "MongoDB Exception", e.message);
     res.status(501).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});



/**
 * API: createSecurityQuestions goes here
*/

module.exports = router;
