const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const controllerUser = require('../controllers/usersController');
const controllerRecipe = require('../controllers/recipesController');
const middlewares = require('../middlewares');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.route('/users')
  .post(controllerUser.createUser);

app.route('/login')
  .post(controllerUser.loginUser);

app.route('/recipes')
  .post(middlewares.validateJWT ,controllerRecipe.createRecipe)
  .get(controllerRecipe.getAllRecipes);

app.route('/recipes/:id')
  .get(controllerRecipe.getRecipeId)
  .put(middlewares.validateJWT, middlewares.validateUser, controllerRecipe.updateRecipe);

module.exports = app;
