const BAD_REQUEST = 400;

const error = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(BAD_REQUEST)
      .json({
        message: err.details[0].message
      });
  }

  return res.status(err.code)
    .json({ message: err.message });;
};

module.exports = error;