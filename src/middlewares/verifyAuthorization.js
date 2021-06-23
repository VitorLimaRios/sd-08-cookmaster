const validateToken = require('../auth/validateToken');

const NOT_AUTHORIZED = 500;
const verifyAuthorization = (req, res, next) =>{
  const  { authorization: token } = req.headers;
  
  const payload = validateToken(token);

  if(!payload) return res.status(NOT_AUTHORIZED).json({message: 'Não Autorizado'});

  next();
};

module.exports =  verifyAuthorization;
