// Import the express module
const express = require("express");
const errorHandler = require("./middleware/errorHandler"); //auto imported when called below
// import dotenv
const dotenv = require("dotenv").config();
// import connectDb
const connectDb = require("./config/dbConnection");

// -- Server setup --//
// Call connectDb from config file
connectDb();
// Call express server through variable app
const app = express();

//Run port in env file via process module or if .env unavaible run the static server at port 5000
const port = process.env.PORT || 5000;

// Use middleware (body parser) to parse data stream received from client.
app.use(express.json());

// set up the get route for the API using the "use" middlewear to define contact routes
// import the folder containing the contact routes
app.use("/api/contacts", require("./routes/contactRoutes"));

// Use custom error handler middleware created
app.use(errorHandler);

// Run the server on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// --End of Server set up //
