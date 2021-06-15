const express = require('express');
const validateJWT = require('../auth/validateJWT');
const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const recipesController = require('../controllers/recipes');

const app = express();
app.use(express.json());

app.get('/users', usersController.getUsers);
app.post('/users', usersController.createUser);
app.post('/login', loginController.login);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.findRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
