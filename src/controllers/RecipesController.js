const multer = require('multer');
const path = require('path');
const RecipesService = require('../services/RecipesService');

const ERROR = 500;
const OK = 200;
const NO_CONTENT = 204;
const DIR_PATH = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callBack) => {
    callBack(null, DIR_PATH);
  },
  filename: (req, _file, callBack) => {
    const { id } = req.params;
    callBack(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage }).single('image');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers['authorization'];
    const { CREATED, message } = await RecipesService
      .createRecipe(name, ingredients, preparation, token);
    return res.status(CREATED).json(message);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const getAll = await RecipesService.getAllRecipes();
    return res.status(OK).json(getAll);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await RecipesService.getRecipeById(id);
    return res.status(OK).json(getId);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipe = await RecipesService
      .updateRecipeById(id, name, ingredients, preparation);
    return res.status(OK).json(updatedRecipe);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await RecipesService.deleteRecipe(id);
    return res.status(NO_CONTENT).json(deleteById);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    upload(req, res, async (err) => {
      if (err) {
        return res.status(ERROR).json({ message: err });
      }
      const { filename } = req.file;
      const newImage = await RecipesService.updateImage(id, filename);
      return res.status(OK).json(newImage);
    });
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipe,
  addImage
};