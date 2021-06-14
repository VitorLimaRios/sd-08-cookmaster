const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../middlewares/validateJWT');
const validateForm = require('../middlewares/validateForm');

const router = express.Router();

router.post('/recipes',
  validateJWT,
  validateForm,
  rescue(recipesController.createRecipe)
);
router.get('/recipes', rescue(recipesController.getAllRecipes));

module.exports = router;