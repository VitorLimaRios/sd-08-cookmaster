const joi = require('joi');
const model = require('../models/recipesModel');
const jwt = require('../auth/validateJWT');
const { ObjectID } = require('mongodb');

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const JWT_MALFORMED = 'jwt malformed';
const NOT_FOUND = 'recipe not found';
const MISSING = 'missing auth token';

const BAD = 400;
const UNAUTHORIZED = 401;
const NOT = 404;

const recipeSchema = joi.object({
  name: joi
    .string()
    .required(),
  ingredients: joi
    .string()
    .required(),
  preparation: joi
    .string()
    .required(),
});

const create = async(recipe, token) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) {
    return {
      verifyError: true,
      error: { message: INVALID_ENTRIES },
      status: BAD,
    };
  }

  const data = await jwt.verifyToken(token);
  if (!data) {
    return {
      verifyError: true,
      error: { message: JWT_MALFORMED },
      status: UNAUTHORIZED,
    };
  }

  const resp = await model.create({ ...recipe, userId: data.data.id });
  return { recipe: resp };
};

const getAll = async() => model.getAll();

const readById = async(id) => {
  const resp = await model.readById(id);

  return resp
    || {
      verifyError: true,
      error: { message: NOT_FOUND },
      status: NOT,
    };
};

const update = async(recipe, token, id) => {
  if (!token)  {
    return {
      verifyError: true,
      error: { message: MISSING },
      status: UNAUTHORIZED,
    };
  }

  const data = await jwt.verifyToken(token);
  if (!data) {
    return {
      verifyError: true,
      error: { message: JWT_MALFORMED },
      status: UNAUTHORIZED,
    };
  }

  console.log('********* DATA *********');
  console.log(data);
  console.log('************************');

  const recipeInDB = await model.readById(id);
  if (!recipeInDB)
  {
    return {
      verifyError: true,
      error: { message: NOT_FOUND },
      status: NOT,
    };
  }

  console.log('********* RECIPE *********');
  console.log(recipeInDB);
  console.log('**************************');

  if (recipeInDB.userId === data.data.id || data.data.role === 'admin') {
    const resp = await model.update(id, { ...recipe, userId: data.data.id });
    return resp;
  }
};

module.exports = {
  create,
  getAll,
  readById,
  update,
};
