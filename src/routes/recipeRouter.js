const express = require('express');
const { createsRecipe, getsRecipes } = require('../controllers/recipeController');
const tokenValidatorMiddl = require('../middlewares/tokenValidator');
const router = express.Router();

router.post('/', tokenValidatorMiddl, createsRecipe );
router.get('/', getsRecipes);

module.exports = router;
