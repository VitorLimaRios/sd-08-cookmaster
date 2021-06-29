const express = require('express');
const router = express.Router();
const RecipesControllers = require('../controllers/Recipes');
const middlewareJWT = require('../middlewares/middlewareJWT_validate');
router.post('/',middlewareJWT.JWT_validate ,RecipesControllers.createRecipes);

module.exports = router; 