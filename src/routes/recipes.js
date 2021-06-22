const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');
const imageUpload = require('../helpers/imageUpload');

const app = express();

app.get('/', recipes.getRecipes);
app.get('/:id', recipes.getRecipeById);

app.post('/', validateJWT, recipes.createRecipe);
app.put('/:id', validateJWT, recipes.updateRecipe);
app.put('/:id/image', validateJWT, imageUpload(), recipes.insertImage);
app.delete('/:id', validateJWT, recipes.deleteRecipe);

module.exports = app;

