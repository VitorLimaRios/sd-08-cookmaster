const rescue = require('express-rescue');
const recipesService = require('../services/recipeService');

const STATUS_CREATE = 201;

const createRecipe = rescue(async (req,res, next)=>{
  const { name, ingredients,preparation } = req.body;

  const result = await recipesService.createRecipe({ name, ingredients,preparation });

  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);

});


module.exports ={
  createRecipe,
};
