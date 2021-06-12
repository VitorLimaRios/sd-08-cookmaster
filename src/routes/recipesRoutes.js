const express = require('express');
const validateJWT = require('../controllers/validateJWT');
const createRecipe = require('../controllers/createRecipe');
const getAllRecipes = require('../controllers/getAllRecipes');
const getRecipeById = require('../controllers/getRecipeById');

const router = express.Router();

router.post('/recipes', validateJWT, createRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getAllRecipes);

module.exports = router;