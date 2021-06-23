const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const STATUS_CREATE = 201;
const STATUS_OK = 200;

const createRecipe = rescue(async (req,res, next)=>{
  const { name, ingredients,preparation } = req.body;

  const result = await recipeService.createRecipe({ name, ingredients,preparation });

  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);

});

const getAll  = rescue(async(req,res, _next)=>{

  console.log(req.userId);
  
  const result = await recipeService.getAll();

  res.status(STATUS_OK).json(result);

});

module.exports ={
  createRecipe, 
  getAll
};