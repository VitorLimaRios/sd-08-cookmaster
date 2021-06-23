const rescue = require('express-rescue');
const recipesService

const STATUS_CREATE = 201;
/* const STATUS_OK = 200; */

const createRecipes = rescue(async (req,res, next)=>{
  const { name, email, password } = req.body;

  const result = await recipesService.createRecipes({ name, email, password });
  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);

});


module.exports ={
  createRecipes,
};
