const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('../middlewares');

const app = express();

const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.post('/users', userController.createUser);
app.post('/login', userController.userLogin);

app.get('/recipes', recipeController.getRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.use(middleware.auth);
app.post('/recipes', recipeController.createRecipe);

app.use(middleware.error);

module.exports = app;
