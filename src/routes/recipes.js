const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.get('/', recipes.getRecipes);

app.post('/', validateJWT, recipes.createRecipe);

module.exports = app;

