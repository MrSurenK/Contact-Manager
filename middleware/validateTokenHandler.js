const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Middleware to validate access token given to user
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    // In postman go to headers and see Authorization key. It has bearer followed by a space and then the access token secret stored there
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // If user is not using a valid token or using someone else token it will throw the following error
      if (err) {
        res.status(401);
        throw new Error("User is not authorised");
      }
      //Verified token and extracted user information embeded in the token and taken that decoded information and attached to the req.user property
      // Intercept the request decode the information and attach the inforamtion on the request.user property
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing in request");
    }
  }
});

module.exports = validateToken;
