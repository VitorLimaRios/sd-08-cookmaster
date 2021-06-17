const jwt = require('jsonwebtoken');
const RecipesModel = require('../models/RecipesModel');

const keySectret = '123456';
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const ZERO = 0;

const validateJWT = async (req, resp, next) => {
  const token = req.headers.authorization;

  if(!token) return resp.status(UNAUTHORIZED).json({ message: 'Token não encontrado!'});

  try {
    const decode = jwt.verify(token, keySectret);
    const { email } = decode.data;

    const user = await RecipesModel.finUserEmail(email);

    if(user.length === ZERO) return resp.status(NOT_FOUND)
      .json({message: 'Usuario não existe'});

    req.user = user[0];
  } catch (err) {
    return resp.status(UNAUTHORIZED).json({ message: err.message });
  }
  next();
};

module.exports = {
  validateJWT,
};
