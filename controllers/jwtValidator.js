const jwt = require('jsonwebtoken');
const model = require('../models/user');

const secret = 'trybe';
const UNAUTH = 401;
const ERROR_TOKEN = {
  message: 'Erro na requisição do token do usuario'
};
const ERROR_JWT = {
  message: 'jwt malformed'
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const tokenDecoded = jwt.verify(token, secret);
    const user = await model.getByEmail(tokenDecoded.email);
    !user && res.status(UNAUTH).json(ERROR_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTH).json(ERROR_JWT);
  }
};

module.exports = validateJWT;