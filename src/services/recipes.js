const recipesModel = require('../models/recipes');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const secret = 'cookmastersecret';

const verifyToken = (token) => {
  if (!token) 
    throw new Error(JSON.stringify({ message: 'missing auth token', code: 401 }));
  
  const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  if (!regex.test(token))
    throw new Error(JSON.stringify({ message: 'jwt malformed', code: 401 }));
};

const isValid = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) 
    return 'Invalid entries. Try again.';

  if (typeof name !== 'string'
    || typeof ingredients !== 'string'
    || typeof preparation !== 'string')
    return 'Entries must be string.';

  return false;
};

const create = async (name, ingredients, preparation, token) => {
  const isUserValid = isValid(name, ingredients, preparation);
  if (isUserValid) throw new Error(JSON.stringify({ message: isUserValid, code: 400 }));
  
  const { _id } = await recipesModel.create(name, ingredients, preparation);
  const { data: userId } = jwt.verify(token, secret);

  return {
    _id,
    userId,
    name,
    ingredients,
    preparation,
  };
};

const getAll = async () => await recipesModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id))
    throw new Error(JSON.stringify({ message: 'recipe not found', code: 404 }));

  const recipe = await recipesModel.getById(id);

  return recipe;
};

const update = async (id, reqBody, token) => {
  const { data: userId } = jwt.verify(token, secret);
  
  const { name, ingredients, preparation } = reqBody;
  await recipesModel.update(id, name, ingredients, preparation);

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const erase = async (id) => await recipesModel.erase(id);

module.exports = {
  verifyToken,
  create,
  getAll,
  getById,
  update,
  erase,
};
