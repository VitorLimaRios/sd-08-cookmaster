const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipe');
const middlewares = require('../middlewares');

router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getById);
router.post('/', middlewares.auth, RecipeController.create);

module.exports = router;
