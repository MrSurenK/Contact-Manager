// Create custom error handling middleware

const errorHandler = (err, req, res, next) => {
  // if we have a status code then we pass the status code if not we pass the status code of 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  // intercept the response message
  res.json({ message: err.message, stackTrace: err.stack });
};

module.exports = errorHandler;
