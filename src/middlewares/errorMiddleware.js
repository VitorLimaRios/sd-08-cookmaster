const { code } = require('../helpers/messages');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    res.status(err.status).send({
      error: err.message,
    });
  }

  res.status(code.SERVER_ERROR).send({
    error: err.message,
  });
};

module.exports = errorMiddleware;
