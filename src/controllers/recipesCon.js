const express = require('express');
const router = express.Router();
const middlewares_recipes = require('../middlewares/recipesValidation');
const { validJWT } = require('../middlewares/validateJWT');
const recipesServices = require('../services/recipesSer');

const code = {
  code200: 200,
  code201: 201,
  code400: 400,
  code404: 404,
  code409: 409,
};

const recipesController = async (req, res) => {
  const {name, ingredients, preparation} = req.body;
  console.log('req.body recipesController line 11', name, ingredients, preparation);

  const messageControlValidation = await middlewares_recipes
    .controlValidation(name, ingredients, preparation);
  console.log('const isNameValid line 14', messageControlValidation);
  if(messageControlValidation.message) 
    return res.status(code.code400).json(messageControlValidation);

  const user = req.user;
  console.log('user line 24', user);
  
  const addRecipes = await recipesServices.addRecipes(req.body, user);
  console.log('addUsers usersCon line 23', addRecipes);
  if(addRecipes.message) 
    return res.status(code.code409).json(addRecipes);

  return res.status(code.code201).json({recipe: addRecipes});

};

const recipesGetAll = async (req, res) => {

  const getAll = await recipesServices.getAllRecipes();

  return res.status(code.code200).json(getAll);

};

const recipesGetById = async (req, res) => {
  const { id } = req.params;

  const filterIdRecipes = await recipesServices.getById(id);
  console.log('------------'); 
  console.log('filterIdRecipes Controller', filterIdRecipes);

  if(filterIdRecipes.message) {
    console.log('------------'); 
    console.log('entrou no if ID INCORRETO');
    return res.status(code.code404).json(filterIdRecipes);
  }

  return res.status(code.code200).json(filterIdRecipes);
};


router.post('/', validJWT, recipesController);
router.get('/', recipesGetAll);
router.get('/:id', recipesGetById);

module.exports = router;
