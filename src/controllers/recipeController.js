const recipeService = require('../services/recipeService');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const CREATED = 201;
const NO_CONTENT = 204;
const OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

const addRecipe = async (req, res) => {
  const userId = req.user._id;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await recipeService.add(
    name,
    ingredients,
    preparation,
    userId
  );

  if (newRecipe === undefined) {
    res.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (newRecipe !== undefined) {
    return res.status(CREATED).json({ recipe: newRecipe });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.status(OK).json(recipes);
  } catch (err) {
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getById(id);

  if (recipe !== null) {
    return res.status(OK).send(recipe);
  } else {
    res.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const userId = req.user._id;
    const recipeToUpdate = {
      id,
      name,
      ingredients,
      preparation,
      userId,
    };
    const recipe = await recipeService.update(recipeToUpdate);
    res.status(OK).send(recipe);
  } catch (err) {
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.exclude(id);
  if (recipe !== null) {
    return res.status(NO_CONTENT).send();
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

const AddImageRecipe = async (req, res) => {
  const { id } = req.params;
  const {path} = req.file;
  const recipe = await recipeService.getById(id);
  const sendPath =`localhost:3000/${path}`;

  if (recipe !== null) {
    const { name, ingredients, preparation, userId } = recipe;
    const recipeToUpdate = { id, name, ingredients, preparation, userId  };
    const recipeWihtImage = await recipeService.updateWithImage(recipeToUpdate, sendPath);
    return res.status(OK).send(recipeWihtImage);
  } else {
    res.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
};


module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  AddImageRecipe
};
