const QOO = 400;
const QON = 409;

const error = (err, _req, res, _next) => {
  if (err.status === QOO) {
    return res.status(QOO)
      .json({ message: err.message });
  }

  if (err.status === QON) {
    return res.status(QON)
      .json({ message: err.message });
  }
};

module.exports = error;
