const express = require('express');
const user = require('./controllers/userController');
const recipe = require('./controllers/recipeController');
const tokenValidator = require('./validateJWT');
const router = express.Router();

router.post('/users', user.createUser);
router.post('/login', user.doLogin);
router.post('/recipes', tokenValidator, recipe.create);
router.get('/recipes', recipe.getAll);
router.get('/recipes/:id', recipe.getRecipeById);
router.put('/recipes/:id', tokenValidator, recipe.updateRecipes);
router.delete('/recipes/:id', tokenValidator, recipe.exclude);

module.exports = router;