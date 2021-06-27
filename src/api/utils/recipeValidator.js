const BAD_REQUEST = 400;
const MESSAGE_ERROR = 'Invalid entries. Try again.';

const recipeValidator = (recipe) => {
  if (!recipe || !recipe.name || !recipe.ingredients || !recipe.preparation) {
    return {
      error: {
        code: BAD_REQUEST,
        message: MESSAGE_ERROR
      }
    };
  }
  return {
    name: recipe.name,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
  };
};

module.exports = recipeValidator;