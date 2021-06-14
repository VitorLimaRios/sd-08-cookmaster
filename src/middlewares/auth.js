const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const SECRET = 'harrypotter';

const UNAUTHORIZED_STATUS = 401;

const error = {
  status: UNAUTHORIZED_STATUS,
  message: 'jwt malformed',
};

const missingJWT = {
  status: UNAUTHORIZED_STATUS,
  message: 'missing auth token',
};

const auth = rescue((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ err: missingJWT });
  try {
    const decoded = jwt.verify(token, SECRET);
    const {
      data: { id, role, userEmail },
    } = decoded;
    req.email = userEmail;
    req.userId = id;
    req.role = role;
  } catch (e) {
    next({ err: error });
  }
  next();
});

module.exports = auth;
