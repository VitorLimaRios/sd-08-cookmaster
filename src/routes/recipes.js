const express = require('express');

const recipes = require('../controllers/recipes');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.use(validateJWT);
app.post('/', recipes.createRecipe);

module.exports = app;

