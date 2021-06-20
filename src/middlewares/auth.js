const jwt =  require('jsonwebtoken');
const model = require('../models/usersModels');

const secret = 'secretjwt';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

const STATUS_401 = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS_401).json({ message: 'missing auth token' });
  }

  try {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) return res.status(STATUS_401).json({ message: 'jwt malformed' });

      const user = await model.findByEmail(decoded.user.email);

      req.user = user;
      next();
    });

  } catch (err) {
    return res.status(STATUS_401).json({ message: err.message });
  }
};
