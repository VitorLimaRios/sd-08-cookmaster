const status = require('./status');
const JWT = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { 
  create, 
  getAll,
  getOne
} = require('../models/recipesModels');

const createRecipe = async (req, res, next) => {
  const secret = 'sherif';
  const token = req.headers.authorization;
  if(!token) return next({
    status: status.UNAUTHORIZED,
    message: 'jwt malformed'
  });

  try {
    const decoded = JWT.verify(token, secret);
    const { name, ingredients, preparation } = req.body;
    const { id } = decoded;
    const insertedID = await create(name, ingredients, preparation, id);
    res.status(status.CREATED)
      .json({ recipe: { name, ingredients, preparation, userId: id, _id: insertedID}});
  } catch (error) {
    next({
      status: status.UNAUTHORIZED,
      message: 'jwt malformed'
    });
  }
};

const checkBody = (req, _res, next) => {
  const data = req.body;
  if(!data.name || !data.ingredients || !data.preparation) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const result = await getAll();
    res.status(status.OK).json(result);
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message
    });
  }
};

const getOneRecipe = async (req, res, next) => {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) return next({
    status: status.NOTFOUND,
    message: 'recipe not found',
  });
  try {
    const result = await getOne(id);
    if(!result) return next({
      status: status.NOTFOUND,
      message: 'recipe not found',
    });
    res.status(status.OK).json(result);
  } catch (error) {
    next({
      status: status.ERRO,
      message: 'Funcao getOne deu erro',
    });
  }
};


module.exports = {
  createRecipe,
  checkBody,
  getAllRecipes,
  getOneRecipe,
};