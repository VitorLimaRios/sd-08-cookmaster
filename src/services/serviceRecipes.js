const recipesModel = require('../models/recipesModels');
const { validateEmail } = require('../middlewares/userMiddleware');

async function createRecipes(recipes) {

  const { name, ingredients, preparation  } = recipes;

  if(!name || !ingredients || !preparation ) {
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  }

  const recipe = await recipesModel.createRecipes(recipes);

  return {code: 201, message: { recipe }};

}

module.exports = { createRecipes };
