const validateToken = require('../auth/validateToken');

const errorClient = require('../utils/errorClient');

const verifyAuthorization = (req, _res, next) =>{
  const  { authorization: token } = req.headers;

  if(!token) next(errorClient.unauthorized('missing auth token'));

  const payload = validateToken(token);

  if(!payload){
    next(errorClient.unauthorized('jwt malformed'));
  };

  next();
};

module.exports =  verifyAuthorization;
