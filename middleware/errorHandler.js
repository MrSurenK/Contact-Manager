// Create custom error handling middleware

// imports constants containing all the error codes
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // if we have a status code then we pass the status code if not we pass the status code of 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    // intercept the response message
    // err.msg returns an object that is created in ContactController
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      break;
  }
};

module.exports = errorHandler;
