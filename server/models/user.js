/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: User Schema for BCRS App.
=======================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-questions');

// Defines the structure of the User document.
let userSchema = new Schema(
     {
        userName: {type: String, required: true, unique: true, dropDups: true },
        password: {type: String, required: true },
        firstName: {type: String },
        lastName: {type: String },
        phoneNumber: {type: String },
        address: {type: String },
        email: {type: String },
        isDisabled: {type: Boolean, default: false },
        role: UserRoleSchema,
        selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
        dateCreated: {type: Date, default: new Date() },
        dateModified: {type: Date }
     },

   {collection: 'users'}
);

//Wraps and exports the userSchema as a model for use in the application.
module.exports = mongoose.model('User', userSchema);

