const services = require('../services/recipesServices');
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

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
  if (resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

const update = rescue(async(req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  let status = OK;
  const resp = await services.update({ name, ingredients, preparation }, token, id);
  if (resp.verifyError) {
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

const excludeRecipe = rescue(async(req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  let status = NO_CONTENT;
  const resp = await services.exclude(token, id);
  

  console.log('RESP ***********************');
  console.log(resp);
  console.log('****************************');
  if (resp) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json();
});

const tokenMiddleware = rescue(async(req, res, next) => {
  const token = req.headers.authorization;
  const data = await services.tokenMiddleware(token);
  if (data.verifyError) {
    status = resp.status;
    return next(resp);
  }

  req.dataToken = data;
  next();
});

const sendImage = rescue(async(req, res, next) => {
  const { id } = req.params;
  const { path } = req.file;
  const imagePath = `localhost:3000/${path}`;
  let status = OK;

  const resp = await services.sendImage(id, imagePath);
  if (resp.verifyError) {
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  update,
  excludeRecipe,
  tokenMiddleware,
  sendImage,
};
