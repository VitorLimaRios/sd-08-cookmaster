module.exports = {
  createUsers: require('../controllers/createUser'),
  login: require('../controllers/login'),
  createRecipes: require('../controllers/createRecipe'),
  getRecipes: require('../controllers/getRecipe'),
  getRecipeById: require('../controllers/getRecipeById'),
  editRecipeById: require('../controllers/editRecipeById'),
  deleteRecipeById: require('../controllers/deleteRecipeById.js'),
};
