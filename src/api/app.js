const express = require('express');
const bodyParser = require('body-parser');
const { validateJWT } = require('../api/auth');
const { createUser, userLogin } = require('../controllers/userController');
const { 
  createRecipe,
  getAllRecipes, 
  getRecipeById, 
  editRecipe, 
  deleteRecipe } = require('../controllers/recipeController');

const app = express();

app.use(bodyParser.json());

app.route('/users')
  .post(createUser);

app.route('/login')
  .post(userLogin);

app.route('/recipes')
  .post(validateJWT,createRecipe)
  .get(getAllRecipes);

app.route('/recipes/:id')
  .get(getRecipeById)
  .put(validateJWT, editRecipe)
  .delete(validateJWT, deleteRecipe);


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
