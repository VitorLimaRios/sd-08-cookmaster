const express = require('express');
const { validateJWT } = require('../../middlewares/validateJWT');
const { checkIfUserIsOwnerRecipeOrAdmin } 
  = require('../../middlewares/checkIfUserIsOwnerRecipeOrAdmin');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.post('/', validateJWT, recipeController.create);
router.get('/', recipeController.getAll);
router.get('/:id', recipeController.findById);
router.put('/:id', validateJWT, checkIfUserIsOwnerRecipeOrAdmin, recipeController.update);
router.delete(
  '/:id',
  validateJWT,
  checkIfUserIsOwnerRecipeOrAdmin,
  recipeController.exclude,
);

module.exports = router;
