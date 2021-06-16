const recipesServices = require('../services/recipesServices');
const { code } = require('../helpers/messages');
const path = require('path');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await recipesServices.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    res.status(code.CREATED).json(newRecipe);
  } catch (error) {
    if (newRecipe.error === 'Invalid entries. Try again.') {
      res.status(code.BAD_REQUEST).json({ message: error.message });
    }
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const user = await recipesServices.getAllRecipes();
    res.status(code.OK).json(user);
  } catch (error) {
    res.status(code.BAD_REQUEST).json(error.message);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getRecipeById(id);
    return res.status(code.OK).json(recipe);
  } catch (error) {
    res.status(code.NOT_FOUND).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  //console.log(req);
  try {
    const { id } = req.params;
    const form = req.body;
    const recipe = await recipesServices.updateRecipe({ id, ...form });
    return res.status(code.OK).json(recipe);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.deleteRecipe(id);
    res.status(code.NO_CONTENT).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const uploadImages = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  try {
    const path = `localhost:3000/src/uploads/${ filename }`;
    const addImage = await recipesServices.uploadImages(id, path);
    return res.status(code.OK).json(addImage);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const getImage = async(req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const imagePath = path.resolve('src/uploads', id);
  return res.status(code.OK).sendFile(imagePath);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImages,
  getImage,
};
