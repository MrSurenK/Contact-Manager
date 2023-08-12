const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    // 1st field
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    // 2nd feild
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "Email address already taken"],
    },

    password: {
      type: String,
      required: [true, "Please fill your password"],
    },
  },
  {
    timestamps: [true],
  }
);

module.exports = mongoose.model("User", userSchema);
