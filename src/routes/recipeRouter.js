const express = require('express');
const { createsRecipe } = require('../controllers/recipeController');
const tokenValidatorMiddl = require('../middlewares/tokenValidator');
const router = express.Router();

router.post('/', tokenValidatorMiddl, createsRecipe );

module.exports = router;
