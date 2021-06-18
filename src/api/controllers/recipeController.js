const service = require('../service/recipesService');

const OK = 200;
const Created = 201;
const excluded = 204;
const notValid = 400;
const notFound = 404;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await service.
      createRecipes( name, ingredients, preparation, req.userId );
    return res.status(Created).json(newRecipe);
  } catch (err) {
    return res.status(notValid).json({
      message: err.message,
    });
  }
};

const getAll = async (_req, res) => {
  const recipes = await service.getAllRecipes();

  return res.status(OK).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await service.getRecipeById(id);

    return res.status(OK).json(recipe);
  } catch (err) {
    return res.status(notFound).json({
      message: err.message,
    });
  }
};

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const update = await service.updateRecipe(id, name, ingredients, preparation);
  res.status(OK).json(update);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  await service.excludeRecipe(id);

  res.status(excluded).json();
};

const upload = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const imagePath = `localhost:3000/${path}`;

  const result = await service.uploadRecipeImage(id, imagePath);
  return res.status(OK).json(result);
};

module.exports = {
  create,
  getAll,
  getRecipeById,
  updateRecipes,
  exclude,
  upload,
};