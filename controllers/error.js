module.exports = (err, _req, res, _next) => {
  const statusError = {
    message: err.error.message
  };
  res.status(err.status).json(statusError);
};