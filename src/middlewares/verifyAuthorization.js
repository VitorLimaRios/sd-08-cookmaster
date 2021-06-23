const validateToken = require('../auth/validateToken');

const { errorGenerator } = require('../utils');

const verifyAuthorization = (req, _res, next) =>{
  const  { authorization: token } = req.headers;
  console.log(token);
  
  const payload = validateToken(token);
  console.log(payload);

  if(!payload){
    next(errorGenerator.unauthorized('jwt malformed'));
  };

  next();
};

module.exports =  verifyAuthorization;
