const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const recipeController = require('../controllers/Recipe');

router.post('/', middlewares.recipeValidation, recipeController.create);

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getById);

module.exports = router;