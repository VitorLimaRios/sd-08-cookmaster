const recipes = require('../services/recipes');

const BAD_REQUEST = 400;
const CREATE = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const OK = 200;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;  

  const newRecipe = await recipes.createRecipe(name, ingredients, preparation, userId);
  if (newRecipe.err) return res.status(BAD_REQUEST).json({ message: newRecipe.err });

  return res.status(CREATE).json(newRecipe.data);
};

const getRecipes = async (req, res) => {
  const result = await recipes.getRecipes();

  return res.status(OK).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipeById = await recipes.getRecipeById(id);
  if (recipeById.err) return res.status(NOT_FOUND).json({ message: recipeById.err });

  return res.status(OK).json(recipeById.data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;  
  const { role, userId } = req;

  const recipeById = await recipes.getRecipeById(id);

  if (String(userId) != String(recipeById.data.userId) && role != 'admin')
    return res.status(NOT_FOUND).json({ message: 'unidentified user' });

  const updatedRecipe = await recipes.updateRecipe(id, name, ingredients, preparation);

  return res.status(OK).json(updatedRecipe.data);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { role, userId } = req;

  const recipeById = await recipes.getRecipeById(id);

  if (String(userId) != String(recipeById.data.userId) && role != 'admin')
    return res.status(NOT_FOUND).json({ message: 'unidentified user' });

  const deletedRecipe = await recipes.deleteRecipe(id);
  return res.status(NO_CONTENT).json(deletedRecipe.data);
};

const insertImage = async (req, res) => {
  const { id } = req.params;
  const { role, userId } = req;

  const recipeById = await recipes.getRecipeById(id);

  if (String(userId) != String(recipeById.data.userId) && role != 'admin')
    return res.status(NOT_FOUND).json({ message: 'unidentified user' });

  const imageUrl = `localhost:3000/src/uploads/${id}.jpeg`;
  const insertedImage = await recipes.insertImage(id, imageUrl, userId);
  return res.status(OK).json(insertedImage.data);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const image = await recipes.getImage(id);
  console.log('controller', image);
  return res.status(OK).json(image.data);
};

module.exports = {
  createRecipe,  
  getRecipes,
  getRecipeById,
  updateRecipe, 
  deleteRecipe,
  insertImage,
  getImage,
};