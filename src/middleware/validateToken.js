const jwt = require('jsonwebtoken');

const generateError = require('../utils/generateError');
const STATUS = require('../utils/httpStatusCodes');
const { SECRET } = require('../utils/doNotLook');

const verifyCallback = (err, decoded) => {
  if (err) {
    throw generateError(STATUS.UNAUTHORIZED, err.message);
  }
  return decoded;
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw generateError(STATUS.UNAUTHORIZED, 'missing auth token');

    const { user } = jwt.verify(token, SECRET, verifyCallback);
    if (!user) throw generateError(STATUS.UNAUTHORIZED, 'no user');

    next();
  } catch (error) {
    return res.status(error.status).json(error.result);
  }
};

module.exports = validateToken;
