const ErrorMessages = require('../api/messages/errorMessages');
const StatusCode = require('../api/messages/statusCodeMessages');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../api/models/userModel');

const secret = process.env.SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(decoded.email);

    if (!user) return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: ErrorMessages.invalidJwt });

    req.user = user;
    next();
  } catch (_err) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: ErrorMessages.invalidJwt });
  }
};

module.exports = { validateJWT };
