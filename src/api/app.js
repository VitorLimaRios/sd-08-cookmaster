const express = require('express');
const UsersController = require('../api/controllers/UsersController');
const RecipesController = require('../api/controllers/RecipesController');
const validateJWT = require('./middlewares/validateJWT');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.newUser);
app.post('/login', UsersController.login);
app.post('/recipes', validateJWT, RecipesController.newRecipe);
app.get('/recipes', RecipesController.getRecipes);
app.get('/recipes/:id', RecipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, RecipesController.update);

module.exports = app;
