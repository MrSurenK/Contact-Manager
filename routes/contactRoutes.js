// Configure routes in this file

// Import express server module
const express = require("express");
// Import express router module
const router = express.Router();

// Set up "get" router using the route module
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

// Export the router set up above to be used in server.js
module.exports = router;
