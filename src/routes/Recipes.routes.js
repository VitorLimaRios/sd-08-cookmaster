const express = require('express');
const RecipesController = require('../controllers/Recipes.controller');
const TokenMiddleware = require('../middlewares/Token.middleware');

const router = express.Router();

router.get('/recipes', RecipesController.index);
router.get('/recipes/:id', RecipesController.show);
router.post('/recipes', TokenMiddleware, RecipesController.create);
router.put('/recipes/:id', TokenMiddleware, RecipesController.update);
router.delete('/recipes/:id', TokenMiddleware, RecipesController.delete);

module.exports = router;