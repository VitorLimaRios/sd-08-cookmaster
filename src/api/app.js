const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/users');
const recipesController = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.createUser);
app.post('/login', userController.login);

app.get('/recipes/:id', recipesController.getRecipeById);
app.get('/recipes',recipesController.getAllRecipes);
app.post('/recipes', auth, recipesController.createRecipe);
app.put('/recipes/:id', auth, recipesController.updateRecipe);
app.delete('/recipes/:id', auth, recipesController.deleteRecipe);

module.exports = app;
