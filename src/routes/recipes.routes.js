const router = require('express').Router();

const useController = require('../controllers/recipes.controllers');

const {
  authenticationByToken,
  recipeValidate,
  recipeIdValidate,
  licenseToAddValidation,
} = require('../middleware/recipesAuth.middleware');

router.post('/', authenticationByToken, recipeValidate, useController.add);

router.get('/', useController.list);

router.get('/:id', recipeIdValidate, useController.find);

router.put('/:id', licenseToAddValidation, useController.update);

module.exports = router;
