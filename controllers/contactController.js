// API methods

// import express-async-handler module
const asyncHandler = require("express-async-handler");
// import mongoose model
const Contact = require("../models/contactModel");

//@desc Get all contacts
// @route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  // find method to communicate with database
  // user id from contact model
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contact
// @route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  // destructured reqest.body
  const { name, email, phone } = req.body;
  // Error handling to prevent empty responses from being reflected
  if (!name || !email || !phone) {
    res.status(400);
    // Create new error object
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    // In middleware it will be decoded and added to req.user.id property automatically
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//@desc Get a contact
// @route POST /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  // Fetch contact in database
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contact
// @route POST /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  // Fetch the contact
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // Disallow a user to update a contact created by another user
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  // update the contact
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    // query option new:true
    { new: true }
  );

  res.status(200).json(updatedContact);
});
//@desc Delete a contact
// @route POST /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  // Fetch contact in database
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

// expose methods to be used in Routes file
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
