const ERRORS = {
  invalid_data: 400,
  conflict: 409
};

const INTERNAL_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  const { err: error } = err;
  const statusCode = ERRORS[error.code] || INTERNAL_ERROR;
  res.status(statusCode).json({ message: error.message });
};
