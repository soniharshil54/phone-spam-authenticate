const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res.serverError(error.message);
};

module.exports = errorHandler;
