const services = require('../services/recipesServices');
const rescue = require('express-rescue');
const model = require('../models/usersModel');
const jwt = require('../auth/validateJWT');

const JWT_MALFORMED = 'jwt malformed';
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const UNAUTHORIZED = 401;

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
  try {
    if (!token) throw new Error('missing auth token');
    const data = jwt.verify(token, secret);
    const user = await model.getByEmail(data.email);
    !user && res.status(UNAUTHORIZED).json(JWT_MALFORMED);
    req.body.userId = user._id;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
});

const sendImage = rescue(async(req, res, next) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const imagePath = `localhost:3000/${path}`;
  
    const result = await services.sendImage(id, imagePath);
    return res.status(OK).json(result);
    
  } catch (error) {
    return res.status(BAD).json({ message: error.message });
  }
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
