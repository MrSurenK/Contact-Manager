// API methods

// import express-async-handler module
const asyncHandler = require("express-async-handler");
// import mongoose model
const Contact = require("../models/contactModel");

//@desc Get all contacts
// @route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  // find method to communicate with database
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create new contact
// @route POST /api/contacts
//@access public

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
  });
  res.status(200).json(contact);
});

//@desc Get a contact
// @route POST /api/contacts/:id
//@access public

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
//@access public

const updateContact = asyncHandler(async (req, res) => {
  // Fetch the contact
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);

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
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
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
