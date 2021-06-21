module.exports = (err, _req, res, _next) => {
  if (err.status) {
    const statusError = {
      message: err.error.message
    };
    res.status(err.status).json(statusError);
  };
};