const jwt = require('jsonwebtoken');
const { findUser } = require('../models/Users');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'meusegredosupercomlexoqueninguemsabe';

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ error: 'Token not found'});

  try {
    const decoded = jwt.verify(authorization, secret);
    const user = await findUser(decoded.id);

    if (!user) return res.status(NOT_FOUND).json({ message: 'User not found' });

    req.user = user;

    next();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Error', error });
  }
};

module.exports = validateJWT;