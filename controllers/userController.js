const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login a user
//POST/api/users/login
//@access public (anyone can access endpoint)
const loginUser = asyncHandler(async (req, res) => {
  //Fetch email address and password when user login
  //Destructure email and password from body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field are mandatory");
  }
  //If there is an email and password check if the user has registered and is in the database
  const user = await User.findOne({ email });
  //Once we have the user, compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // Payload embeded in token
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      //Set access token secret in env file
      process.env.ACCESS_TOKEN_SECRET,
      //Expiry time for access token
      { expiresIn: "20min" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Get current user
//POST/api/users/current
//@access private (Require access token to get user info))
const currentUser = asyncHandler(async (req, res) => {
  //In validate information we attached the decoded user information onto req.user
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
