const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/recipes', recipesController.createRecipes);


module.exports = router;
