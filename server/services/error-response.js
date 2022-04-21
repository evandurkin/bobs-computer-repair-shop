/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 20 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Error response model object.
=======================================
*/

// Error response model
class ErrorResponse {

    constructor(httpCode, message, data) {
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
    }

// Returns an object
    toObject() {

      return {
        httpCode: this.httpCode,
        message: this.message,
        data: this.data,
        timestamp: new Date().toLocaleDateString(),
      };
    }
  }
  module.exports = ErrorResponse;
