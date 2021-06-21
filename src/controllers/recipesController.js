const express = require('express');
const router = express.Router();
const recipesValidation = require('../middlewares/recipesValidation');
const { verifyJwt } = require('../middlewares/jwtValidation');
const recipesServices = require('../services/recipesServices');

const code = {  
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409,
};

const recipesController = async (req, res) => {
  const {name, ingredients, preparation} = req.body;
  const validation = await recipesValidation
    .controlValidation(name, ingredients, preparation);

  if(validation.message) 
    return res.status(code.BAD_REQUEST).json(validation);

  const user = req.user;
  const addRecipes = await recipesServices.addRecipes(req.body, user);

  if(addRecipes.message) 
    return res.status(code.CONFLICT).json(addRecipes);

  return res.status(code.CREATED).json({recipe: addRecipes});

};

router.post('/', verifyJwt, recipesController);

module.exports = router;
