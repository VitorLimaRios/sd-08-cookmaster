const {BAD_REQUEST} =require('../services/utils/variableStatus');

const error = (err, req, res, next) => {
  if (err.isJoi) {
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