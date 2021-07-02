const validateToken = require('../auth/validateToken');

const errorClient = require('../utils/errorClient');

const verifyAuthorization = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) throw errorClient.unauthorized('missing auth token');

  let payload = null;
  try {
    payload = validateToken(token);
  } catch (error) {
    throw errorClient.unauthorized('jwt malformed');
  }

  next();
};

module.exports =  verifyAuthorization;
