const express = require('express');
const bodyParser = require('body-parser');
const users = require('../controllers/usersControllers');
const recipes = require('../controllers/recipesControllers');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// USERS
app.post('/users', users.createUser);
app.post('/login', users.login);
app.post('/users/admin', users.createAdmin);

// RECIPES
app.post('/recipes', recipes.createRecipe);
app.get('/recipes', recipes.getAllRecipes);
app.get('/recipes/:id', recipes.getById);
app.put('/recipes/:id', recipes.update);
app.delete('/recipes/:id', recipes.excludeRecipe);

app.use((error, _req, res, _next) => {
  console.log('-----------------------------------------------------');
  console.log(error);
  console.log('-----------------------------------------------------');
  const resp = { message: error.error.message };
  res.status(error.status).json(resp);
});

module.exports = app;
