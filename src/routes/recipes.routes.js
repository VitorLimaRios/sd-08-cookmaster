const router = require('express').Router();

const useController = require('../controllers/recipes.controllers');

const {
  authenticationByToken,
  recipeValidate,
  recipeIdValidate,
} = require('../middleware/recipesAuth.middleware');

router.post('/', authenticationByToken, recipeValidate, useController.add);

router.get('/', useController.list);

router.get('/:id', recipeIdValidate, useController.find);

module.exports = router;
