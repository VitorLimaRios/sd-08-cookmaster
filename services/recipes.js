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

module.exports = {
  createRecipe,
};
