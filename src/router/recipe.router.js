const express = require('express');
const { auth } = require('../Middlewares/auth');
const { validateFormRecipes, validateId } = require('../Middlewares/form');
const controller = require('../controllers/recipe.controller');

const router = express.Router();

router.post('/',
  validateFormRecipes,
  auth, 
  controller.register)
  .get('/', controller.findAll);

router.get('/:id', validateId,
  controller.findById);

module.exports = router;