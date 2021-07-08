const express = require('express');
const bodyParser = require('body-parser');

const Users = require('../controllers/users');
const Recipes = require('../controllers/recipes');

const jwtValid = require('../middlewares/jwtValid');
const userValid = require('../middlewares/userValid');

const app = express();
app.use(bodyParser.json());


app.post('/users', Users.addUser);
app.post('/users/admin', jwtValid, Users.addAdmin);

app.post('/login', Users.login);

app.post('/recipes', jwtValid, Recipes.addRecipe);
app.get('/recipes/:id', Recipes.getRecipeById);
app.get('/recipes', Recipes.getAllRecipes);
app.put('/recipes/:id', jwtValid, userValid, Recipes.updateRecipeById);
app.delete('/recipes/:id', jwtValid, userValid, Recipes.deleteRecipeById);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
