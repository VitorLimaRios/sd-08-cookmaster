const express = require('express');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');
const router = express.Router();

router.post('/users', userController.createUser);

router.post('/login', userController.login);

router.post('/recipes', validateJWT, recipesController.createRecipe);

module.exports = router;
