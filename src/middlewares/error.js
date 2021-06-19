const { STATUS } = require('../constants');

const ERRORS = {
  invalid_data: STATUS.BAD_REQUEST,
  conflict: STATUS.CONFLICT,
  invalid_login: STATUS.UNAUTHORIZED,
  missing_token: STATUS.UNAUTHORIZED,
  invalid_token: STATUS.UNAUTHORIZED,
  invalid_recipe: STATUS.BAD_REQUEST,
  not_found: STATUS.NOT_FOUND,
  access_denied: STATUS.UNAUTHORIZED,
  forbidden: STATUS.FORBIDDEN
};


const INTERNAL_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  if (!err.err) return res
    .status(STATUS.INTERNAL_ERROR)
    .json({ message: 'Internal error' });

  const { err: error } = err;
  // console.log('error linha 11', error.code);
  // console.log('error linha 12', ERRORS[error.code]);
  const statusCode = ERRORS[error.code] || INTERNAL_ERROR;

  res.status(statusCode).json({ message: error.message });
};
