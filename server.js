// Import the express module
const express = require("express");
// import dotenv
const dotenv = require("dotenv").config();

// -- Server setup --//
// Call express server through variable app
const app = express();

//Run port in env file via process module or if .env unavaible run the static server at port 5000
const port = process.env.PORT || 5000;

// set up the get route for the API using the following express methods
app.get("/api/contacts", (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

// Run the server on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// --End of Server set up //
