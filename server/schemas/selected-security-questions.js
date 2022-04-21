 /*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: CRUD APIs for users.
=======================================
*/

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const selectedSecurityQuestionsSchema = new Schema({
    questionText: {type: String },
    answerText: {type: String }
 });

 module.exports = selectedSecurityQuestionsSchema;
