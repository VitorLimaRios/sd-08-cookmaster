const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'meusegredosupercomlexoqueninguemsabe';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED)
    .json({ error: 'missing auth token'});

  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded =>', decoded);
    const user = await Users.findUserById(decoded.id);
    console.log('validateJWT user => ', user);
    if (!user) return res.status(NOT_FOUND).json({ message: 'User not found' });

    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed', });
  }
};

module.exports = validateJWT;