//@desc Register a user
//POST/api/users/register
//@access public (anyone can access endpoint)
const registerUser = asyncHandler(async (req, res) => {
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
