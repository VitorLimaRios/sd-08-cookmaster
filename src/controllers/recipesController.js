const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const validateToken = require('../auth/validateToken');
const successResponse = require('../utils/successResponse');

const createRecipe = rescue(async (req,res, next)=>{
  const { name, ingredients,preparation } = req.body;
  const { authorization : token } = req.headers;
  const { email } = validateToken(token);

  const result = await recipesService
    .createRecipe({ name, ingredients,preparation }, email);
  if(result.error) return next(result);

  res.status(successResponse.Created()).json(result);

});

const getAll  = rescue(async(_req,res, _next)=>{

  const result = await recipesService.getAll();

  res.status(successResponse.OK()).json(result);

});

const getById = rescue(async (req,res, next) =>{
  const { id } = req.params;
  const result = await recipesService.getById(id);
  if(result.error) return next(result);
  res.status(successResponse.OK()).json(result);
});

module.exports ={
  createRecipe,
  getAll, 
  getById
};