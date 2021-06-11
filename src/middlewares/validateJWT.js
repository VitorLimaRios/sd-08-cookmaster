const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../api/models/userModel');

const secret = process.env.SECRET;

const UNAUTHORIZED = 401;
const INVALID_JWT = 'jwt malformed';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(decoded.email);

    if (!user) return res
      .status(UNAUTHORIZED)
      .json({ message: INVALID_JWT });

    req.user = user;
    next();
  } catch (_err) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: INVALID_JWT });
  }
};

module.exports = { validateJWT };
