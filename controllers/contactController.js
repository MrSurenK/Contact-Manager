// API methods

//@desc Get all contacts
// @route GET /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Create new contact
// @route POST /api/contacts
//@access public

const createContact = (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  // Error handling to prevent empty responses from being reflected
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(200).json({ message: "Create contact" });
};

//@desc Get a contact
// @route POST /api/contacts/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

//@desc Update contact
// @route POST /api/contacts/:id
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc Delete a contact
// @route POST /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

// expose methods to be used in Routes file
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
