/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 04 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: App.js file for BCRS App.
=======================================
*/

/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

/**
 * Required API's
 */
const UserApi = require("./routes/user-api");
const SecurityQuestionsApi = require("./routes/security-questions-api");
const SessionApi = require("./routes/session-api");
const RoleApi = require("./routes/role-api");
const ServicesApi = require("./routes/services-api");
const InvoiceApi = require("./routes/invoice-api");

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

/**
 * Variables
 */
const port = process.env.port || 3000; // server port

// Database connection string - mongoDB account configured to accept request from any IP
const conn = `mongodb+srv://450-user:Qwerty123@cluster0.mlnw2.mongodb.net/bcrs?retryWrites=true&w=majority`;

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 *CRUD API(s) go here...
 */
app.use("/api", UserApi);
app.use("/api", SecurityQuestionsApi);
app.use("/api", SessionApi);
app.use("/api", RoleApi);
app.use("/api", ServicesApi);
app.use("/api/", InvoiceApi);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
