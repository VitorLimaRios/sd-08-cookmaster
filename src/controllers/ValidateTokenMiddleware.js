const { validateToken } = require('../utils');

const UNAUTHORIZED = 401;

const ValidateTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  const { ok, user } = validateToken(authorization);

  if (!ok) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

  req.user = user;
  next();
};

module.exports = ValidateTokenMiddleware;