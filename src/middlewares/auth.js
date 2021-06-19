const jwt = require('jsonwebtoken');
const { customError } = require('../utils');

const secret = 'o-segredo-do-sucesso-é-o-segredo';

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(customError('missing auth token', 'missing_token'));
  
  let user;
  
  try {
    user = jwt.verify(token, secret);
  } catch (error) {
    return next(customError('jwt malformed', 'invalid_token'));
  }

  const { id, email, role } = user;
  
  req.user = { id, email, role };

  next();
};
