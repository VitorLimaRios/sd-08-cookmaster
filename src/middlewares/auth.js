const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const SECRET = 'harrypotter';

const UNAUTHORIZED_STATUS = 401;

const error = {
  status: UNAUTHORIZED_STATUS,
  message: 'jwt malformed',
};

const auth = rescue((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ err: error });
  try {
    const decoded = jwt.verify(token, SECRET);
    const {data: {id, role}} = decoded;
    req.userId = id;
    req.role = role;
  } catch (e) {
    next({ err: error });
  }
  next();
});

module.exports = auth;
