const mongoose = require("mongoose");

// Schema will have all the values in contact
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },

    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  { timestamps: true }
);

// Export the created mongoose object
module.exports = mongoose.model("Contact", contactSchema);
