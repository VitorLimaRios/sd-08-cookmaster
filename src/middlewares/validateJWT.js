const jwt = require('jsonwebtoken');
const Joi = require('joi');
const model = require('../models/usersModel');
const ERRO_401 = 401;

const secret = 'cookmaster-sd08';

const tokenValidate = (token) => {
  return Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required().validate(token);
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  const { error } = tokenValidate(token);

  if (error) return res.status(ERRO_401).json({
    message: 'jwt malformed',
  });

  try {
    const decode = jwt.verify(token, secret);
    const user = await model.findSingleEmail(decode.data.email);

    if (!user) return res.status(ERRO_401).json({
      message: 'jwt malformed',
    });

    req.user = user;
    next();
  } catch (error) {
    res.status(ERRO_401).json({
      message: 'Erro ao procurar usuário',
    });
  }
};

module.exports = {
  validateJWT,
};
