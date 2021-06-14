const httpStatusCodes = require('../data/httpStatusCodes');

const ERRORS = {
  invalid_data: httpStatusCodes.BAD_REQUEST,
  conflict: httpStatusCodes.CONFLICT,
  invalid_login: httpStatusCodes.UNAUTHORIZED
};

const INTERNAL_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  const { err: error } = err;
  const statusCode = ERRORS[error.code] || INTERNAL_ERROR;
  res.status(statusCode).json({ message: error.message });
};
