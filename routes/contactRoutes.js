// Configure routes in this file

// Import express server module
const express = require("express");
// Import express router module
const router = express.Router();
// import getContact from contactController
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

//This will use validateToken middleware on all of the routes (Middleware declared globally)
router.use(validateToken);
// Set up "get" router using the route module
// post and get contact method can be combined as they have similar endpoints
router.route("/").get(getContacts).post(createContact);

// Set up route to get an individual contact
// Set up "put" router using the route module
// Set up "delete" router using the route module
// combine the methods as they share the same endpoints
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// Export the router set up above to be used in server.js
module.exports = router;
