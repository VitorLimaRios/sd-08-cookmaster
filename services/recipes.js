const recipesModel = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation, _id) => {
  if(!name || !ingredients || !preparation)
    return { code: 400, message: { message: 'Invalid entries. Try again.' } };
  const data = await recipesModel.createRecipe(name, ingredients, preparation, _id);
  const recipe = {
    recipe: {
      name: data.name,
      ingredients: data.ingredients,
      preparation: data.preparation,
      userId: data.userId,
      _id: data._id,
    }
  };

  return { code: 201, message: recipe };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return { code: 200, message: recipes };
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  if (!recipe || recipe.error) {
    return { code: 404, message: { message: 'recipe not found' } };
  }
  return { code: 200, message: recipe };
};

const deleteRecipe = async (id) => {
  const result = await recipesModel.deleteRecipe(id);
  return { code: 204, message: '' };
};

const updateRecipe = async (id, newRecipe) => {
  const update = await recipesModel.updateRecipe(id, newRecipe);
  return { code: 200, message: update };
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  deleteRecipe,
  updateRecipe,
};
