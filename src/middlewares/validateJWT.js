const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const secret = 'meusegredosupercomlexoqueninguemsabe';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED)
    .json({ message: 'missing auth token'});

  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.findUserById(decoded.id);
    if (!user) return res.status(NOT_FOUND).json({ message: 'User not found' });
    req.user = { id: decoded.id, name: user.name, email: user.email, role: user.role };

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed', });
  }
};

module.exports = validateJWT;