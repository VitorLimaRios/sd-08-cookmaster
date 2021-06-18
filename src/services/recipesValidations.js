const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const { errors } = require('../utils/errorsNCodes');
const { tokenDecodation } = require('../utils/tokenation');
const { Recipes: { notFound, noAuth, invalidToken } } = errors;

const checkIdSearch = async (req, res, next) => {
  const idParams = req.params;
  const existsInDb = await recipesModel.getRecipeById(idParams.id);
  if (!existsInDb) return res
    .status(notFound.status).send(notFound.send);
  next();
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(noAuth.status).send(noAuth.send);
  }
  const dataExists = await tokenDecodation(authorization);
  if (!dataExists || !dataExists.data) {
    return res.status(invalidToken.status).send(invalidToken.send);
  }
  const validAuth = await usersModel.findUserByEmail(dataExists.data);
  if (!validAuth) return res.status(invalidToken.status).send(invalidToken.send);
  next();
};

module.exports = { checkIdSearch, validateToken };
