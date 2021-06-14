const express = require('express');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');
const router = express.Router();

router.post('/users', userController.createUser);

router.post('/login', userController.login);

router.post('/recipes', validateJWT, recipesController.createRecipe);

router.get('/recipes', recipesController.getAll);

router.get('/recipes/:id', recipesController.recipeById);

module.exports = router;
