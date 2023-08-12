const mongoose = require("mongoose");

// Schema will have all the values in contact
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // reference of the model (User)
      ref: "User",
    },
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
