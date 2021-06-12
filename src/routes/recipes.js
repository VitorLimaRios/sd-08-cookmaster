const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const recipeController = require('../controllers/Recipe');

router.post('/', middlewares.recipeValidation, recipeController.create);

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getById);

router.put('/:id', middlewares.recipeValidation, recipeController.edit);

router.delete('/:id', middlewares.auth, recipeController.remove);

module.exports = router;