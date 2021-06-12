const BAD_REQUEST = 400;
const ERROR_SERVIDOR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    const errorMessages = err.details.map(detail => detail.message).join('; ');
    return res.status(BAD_REQUEST).json({ message: errorMessages });
  }

  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    const { message } = payload;
    return res.status(statusCode).json({ message });
  }

  res.status(ERROR_SERVIDOR).json(err.message);
};