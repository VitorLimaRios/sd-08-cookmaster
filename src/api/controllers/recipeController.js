const RecipeService = require('../services/recipeService');
const StatusCode = require('../messages/statusCodeMessages');

const create = async (req, res) => {
  try {
    const newRecipe = req.body;
    const { user } = req;

    const createdRecipe = await RecipeService.create(newRecipe, user._id);

    res.status(StatusCode.CREATED).json(createdRecipe);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

const getAll = async (_req, res) => {
  const allRecipes = await RecipeService.getAll();

  res.status(StatusCode.OK).json(allRecipes);
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeService.findById(id);
    
    res.status(StatusCode.OK).json(recipe);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const newRecipe = req.body;
    const { user } = req;
    
    const updatedRecipe = await RecipeService.update(id, newRecipe, user._id);
    
    res
      .status(StatusCode.OK)
      .json(updatedRecipe);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }  
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await RecipeService.exclude(id);
    
    res
      .status(StatusCode.NO_CONTENT)
      .json(deletedRecipe);
  } catch (error) {
    const { code, message } = error;    
    res.status(code).json(message);
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const fullPathImage = `localhost:3000/src/uploads/${id}.jpeg`;
    
    const updatedRecipeWithImage = await RecipeService
      .updateImage(id, fullPathImage);
    
    res
      .status(StatusCode.OK)
      .json(updatedRecipeWithImage);
  } catch (error) {
    const { message, code } = error;
    res
      .status(code)
      .json({ message });
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
  updateImage,
};
