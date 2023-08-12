const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc Register a user
//POST/api/users/register
//@access public (anyone can access endpoint)
const registerUser = asyncHandler(async (req, res) => {
  // Destructure the body key values required
  const { username, email, password } = req.body;
  //Check if any field are empty and throw an error
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field must be filled");
  }
  // Check if email has been taken
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registerd");
  }
  //Hash password
  //bcrypt returns a promise
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log("The hashed password is: ", hashedPassword);
  res.json({ message: "Register the user" });
});

//@desc Login a user
//POST/api/users/login
//@access public (anyone can access endpoint)
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

//@desc Get current user
//POST/api/users/current
//@access private (Only logged in user get get this information))
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
