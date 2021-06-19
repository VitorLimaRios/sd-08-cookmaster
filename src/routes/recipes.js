const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');
const middlewares = require('../middlewares');

router.post('/', middlewares.auth, RecipeController.createRecipe);

module.exports = router;