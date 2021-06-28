const { BAD_REQUEST, UNAUTHORIZED } = require('../services/utils/variableStatus');

const error = (err, req, res, next) => {
  if (err.isJoi) {
    if (err.details[0].message == 'All fields must be filled'
      || err.details[0].message == 'Incorrect username or password') {
      return res.status(UNAUTHORIZED).json({
        message: err.details[0].message
      });
    }
    return res.status(BAD_REQUEST).json({
      message: err.details[0].message
    });
  }

  return res.status(err.code)
    .json({ message: err.message });
};

module.exports = {
  error
};