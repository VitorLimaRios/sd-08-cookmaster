// https://expressjs.com/pt-br/guide/error-handling.html

module.exports = (err, _req, res, _next) => {
  const errorMessage = {
    message: err.error.message
  };

  res.status(err.status).json(errorMessage);
};
