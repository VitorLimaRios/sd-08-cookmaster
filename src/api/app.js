const express = require('express');
const bodyParser = require('body-parser');
const User = require('./controllers/users/Users');
const Recipe = require('./controllers/recipes/Recipes');
const validateCreateMiddleware = require('./middlewares/users/validateCreateMiddleware');
const validateLoginMiddleware = require('./middlewares/users/validateLoginMiddleware');
const validateCreateRecipeMiddleware =
  require('./middlewares/recipes/validateCreateRecipeMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

//Users
app.post('/users', validateCreateMiddleware, User.create);
app.post('/login', validateLoginMiddleware, User.login);

//Recipes
app.post('/recipes', validateCreateRecipeMiddleware, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getRecipeById);
app.put('/recipes/:id', Recipe.update);

module.exports = app;
