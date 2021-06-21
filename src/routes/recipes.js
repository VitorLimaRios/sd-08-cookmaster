const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.get('/:id', recipes.getRecipeById);
app.get('/', recipes.getRecipes);
app.post('/', validateJWT, recipes.createRecipe);

module.exports = app;

