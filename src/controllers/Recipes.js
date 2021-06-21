const service = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createRecipe(newRecipe, token);
  return res.status(status).json(result);
};

const searchRecipes = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await service.searchRecipes(id);
  return res.status(status).json(result);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.updateRecipe(id, newData, token);
  return res.status(status).json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { status, result } = await service.deleteRecipe(id, token);
  return res.status(status).json(result);
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const imagePath = `localhost:3000/${req.file.path}`;
  const { status, result } = await service.addImage(id, token, imagePath);
  return res.status(status).json(result);
};

module.exports = {
  createRecipe,
  searchRecipes,
  updateRecipe,
  deleteRecipe,
  addImage,
};
