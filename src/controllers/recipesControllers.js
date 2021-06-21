const services = require('../services/recipesServices');
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;

const createRecipe = rescue(async(req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  let status = CREATED;
  const resp = await services.create({ name, ingredients, preparation }, token);
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

const getAllRecipes = rescue(async(_req, res, _next) => {
  const resp = await services.getAll();
  res.status(OK).json(resp);
});
const getById = rescue(async(req, res, next) => {
  const { id } = req.params;
  let status = OK;
  const resp = await services.readById(id);
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
};
