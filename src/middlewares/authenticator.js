
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/usersModel');

const secret = 'secret';
const UNAUTHORIZED = 401;

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if(!token) {
      return res.status(UNAUTHORIZED).send({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret);
    const { _id, role } = await getUser(decoded.data.email);
    req.userId = _id;
    req.role = role;
    next();
  } catch(_e) {
    return res.status(UNAUTHORIZED).send({ message: 'jwt malformed' });
  }
};

module.exports = authenticator;