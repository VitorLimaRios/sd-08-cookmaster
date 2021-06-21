const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.get('/:id', recipes.getRecipeById);
app.get('/', recipes.getRecipes);

app.use(validateJWT);
app.post('/', recipes.createRecipe);

module.exports = app;

