const Recipes = require('../services/recipes');

const HTTP_OK = 200;
const HTTP_Created = 201;
const HTTP_Bad_Request = 400;

const invalidEntries = { 'message': 'Invalid entries. Try again.' };

const getAll = async (req, res) => {
  const recipes = await Recipes.getAll();

  res.status(HTTP_OK).json(recipes);
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const userId = req.user._id; // req.user = payload;

  if (!name || !ingredients || !preparation) { 
    return res.status(HTTP_Bad_Request).json(invalidEntries); 
  }

  const newRecipe = await Recipes.create(name, ingredients, preparation, userId );
  
  res.status(HTTP_Created).json(newRecipe);
};

module.exports = {
  getAll,
  create
};