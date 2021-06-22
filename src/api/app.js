const express = require('express');
const bodyParser = require('body-parser');

const Users = require('./controllers/Users');
const Recipes = require('./controllers/Recipes');

const { validateUser } = require('./schemas/UserSchema');
const { validateLogin } = require('./schemas/LoginSchema');
const { validateRecipe } = require('./schemas/RecipeSchema');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/users', Users.getAll);
app.post('/users', validateUser, Users.newUser);
app.post('/login', validateLogin, Users.login);

app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.findById);
app.post('/recipes', validateRecipe, validateJWT, Recipes.newRecipe);

module.exports = app;
