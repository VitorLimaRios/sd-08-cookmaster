
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/usersModel');

const secret = 'secret';
const UNAUTHORIZED = 401;

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const { _id } = await getUser(decoded.data.email);
    req.userId = _id;
    next();
  } catch(_e) {
    return res.status(UNAUTHORIZED).send({ message: 'jwt malformed' });
  }
};

module.exports = authenticator;