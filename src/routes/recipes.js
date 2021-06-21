const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.get('/', recipes.getRecipes);
app.get('/:id', recipes.getRecipeById);

app.post('/', validateJWT, recipes.createRecipe);
app.put('/:id', validateJWT, recipes.updateRecipe);

module.exports = app;

