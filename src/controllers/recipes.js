const Recipes = require('../services/recipes');

const HTTP_OK = 200;
const HTTP_Created = 201;
const HTTP_Bad_Request = 400;
const HTTP_Not_Found = 404;

const invalidEntries = { 'message': 'Invalid entries. Try again.' };
const notFound = { 'message': 'recipe not found' };

const getAll = async (req, res) => {
  const recipes = await Recipes.getAll();

  res.status(HTTP_OK).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipeID = await Recipes.getById(id);

  if (!recipeID) {
    res.status(HTTP_Not_Found).json(notFound);
  } else { 
    res.status(HTTP_OK).json(recipeID);
  }
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
  getById,
  create
};