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
  const {authorization: token} = req.headers;
  try {
    if (!token) throw new Error('missing auth token');
    const tokenDecoded = jwt.verify(token, secret);
    const user = await model.getByEmail(tokenDecoded.email);
    console.log('user', user);
    !user && res.status(UNAUTH).json(ERROR_JWT);
    req.body.userId = user._id;
    next();
  } catch (error) {
    return res.status(UNAUTH).json({ message: error.message });
  }
};

module.exports = validateJWT;