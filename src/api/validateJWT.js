const jwt = require('jsonwebtoken');

const usersModels = require('../models/users');

const secret = 'umaSenhaMuitoDoida';
const BAD_REQUEST = 401;

const validateJWT = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(BAD_REQUEST).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModels.findByEmail(decoded.data.email);

    if (!user) {
      return res.status(BAD_REQUEST).json({ message: 'Failed to find user with token' });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
