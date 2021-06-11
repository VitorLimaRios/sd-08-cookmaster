const express = require('express');
const RecipesController = require('../controllers/Recipes.controller');
const TokenMiddleware = require('../middlewares/Token.middleware');

const router = express.Router();

router.get('/recipes', RecipesController.index);
router.post('/recipes', TokenMiddleware, RecipesController.create);

module.exports = router;