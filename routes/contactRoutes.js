// Configure routes in this file

// Import express server module
const express = require("express");
// Import express router module
const router = express.Router();

// Set up "get" router using the route module
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

// Set up "post" router using the route module
router.route("/").post((req, res) => {
  res.status(200).json({ message: "Create contact" });
});

// Set up route to get an individual contact
router.route("/:id").get((req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// Set up "put" router using the route module
router.route("/:id").put((req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

// Set up "delete" router using the route module
router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

// Export the router set up above to be used in server.js
module.exports = router;
