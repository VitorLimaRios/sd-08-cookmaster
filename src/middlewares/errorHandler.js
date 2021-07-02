const errorServer  = require('../utils/erroServer');

module.exports = (err, _req, res, _next) => {
  const statusCode = err.statusCode || errorServer. internalServerError();
  return res.status(statusCode).json({ message: err.message });
};
