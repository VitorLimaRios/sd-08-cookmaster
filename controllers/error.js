module.exports = (err, _req, res, _next) => {
  console.log(err);
  const statusError = {
    message: err.error.message
  };
  res.status(err.status).json(statusError);
};