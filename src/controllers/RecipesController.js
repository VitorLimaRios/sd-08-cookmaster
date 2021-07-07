const Recipes = require('../services/Recipes');

const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;
const INTERNAL_ERROR = 'Internal error';

const newRecipe = async (req, res) => {
  const recipeFromBody = req.body;
  const user = req.user;
  const recipe = await Recipes.newRecipe(recipeFromBody, user.id);
  
  try {
    if (recipe.error) return res.status(recipe.error.code)
      .json({ message: recipe.error.message});

    return res.status(CREATED).json(recipe);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

const getRecipes = async (_req, res) => {
  const recipes = await Recipes.getRecipes();
  return res.status(OK).json(recipes);

};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  try {
    if (recipe.error) return res.status(recipe.error.code)
      .json({ message: recipe.error.message });

    return res.status(OK).json(recipe);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const newDataRecipe = req.body;
  const user = req.user;
  const recipe = await Recipes.update(id, newDataRecipe, user);
  try {
    if (recipe.error) return res.status(recipe.error.code)
      .json({ message: recipe.error.message});
    return res.status(OK).json(recipe);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    await Recipes.remove(id, user);
    return res.status(NO_CONTENT).json();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

const image = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const image = req.file;
  try {
    const updatedRecipe = await Recipes.image(id, image, user);
    return res.status(OK).json(updatedRecipe);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Recipes.getImage(id);
    if (image.error) return res.status(image.error.code)
      .json({ message: image.error.message }); 
    return res.status(OK).send(image);
    
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error });
  }
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  update,
  remove,
  image,
  getImage
};