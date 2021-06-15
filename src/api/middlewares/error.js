const QOO = 400;
const QON = 409;
const QOU = 401;
const QOQ = 404;

const error = (err, _req, res, _next) => {
  if (err.status === QOO) {
    return res.status(QOO)
      .json({ message: err.message });
  }

  if (err.status === QON) {
    return res.status(QON)
      .json({ message: err.message });
  }

  if (err.status === QOU) {
    return res.status(QOU)
      .json({ message: err.message });
  }

  if (err.status === QOQ) {
    return res.status(QOQ)
      .json({ message: err.message });
  }
};

module.exports = error;
