const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');
const { status, message } = require('../schema/status');

const secret = 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    const userData = await usersModels.findUserByEmail(decoded.data.email);
    if (!userData) {
      return res.status(status.unauthorized).json({ message: message.invalidToken });
    }
    req.userId = userData._id;
    req.role = userData.role;
  } catch (err) {
    return res.status(status.unauthorized).json({ message: message.invalidToken });
  }
  next();
};

module.exports = validateJWT;
