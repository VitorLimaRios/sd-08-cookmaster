const RecipesServices = require('../services/RecipesServices');

const SUCCESS = 200;
const CREATED = 201;
const OK = 204;
const BAD_REQ = 400;
const UN_REQ = 401;
const NOT_FOUND = 404;

const addNewRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;

    const recipeToAdd = await RecipesServices
      .addNewRecipe(name, ingredients, preparation, userId);

    res
      .status(CREATED)
      .json(recipeToAdd);

  } catch (err) {
    res
      .status(BAD_REQ)
      .json({
        message: err.message,
      });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipesToList = await RecipesServices
      .getAllRecipes();

    res
      .status(SUCCESS)
      .json(recipesToList);

  } catch (err) {
    res
      .status(BAD_REQ)
      .json({ message: err.message });
  }
};

const getAllById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RecipesServices
      .getAllById(id);

    res
      .status(SUCCESS)
      .json(result);

  } catch (err) {

    res
      .status(NOT_FOUND)
      .json({
        message: err.message,
      });
  }
};

const recipeToUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const result = await RecipesServices
      .recipeToUpdate(id, name, ingredients, preparation);

    return res
      .status(SUCCESS)
      .json(result);

  } catch (err) {
    return res
      .status(UN_REQ)
      .json({
        message: err.message,
      });
  }
};
  
const recipeToDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await RecipesServices.recipeToDelete(id);

    return res
      .status(OK)
      .json(deletedRecipe);

  } catch (err) {
    return res
      .status(BAD_REQ)
      .json({ message: err.message });
  };
};

const addNewRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;

    const newImage = 'localhost:3000/' + path;
    const recipeImageToAdd = await RecipesServices.addNewRecipeImage(id, newImage);

    return res
      .status(SUCCESS)
      .json(recipeImageToAdd);
  } catch (err) {
    return res
      .status(BAD_REQ)
      .json({ message: 'upload failed' });
  }
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getAllById,
  recipeToUpdate,
  recipeToDelete,
  addNewRecipeImage,
};