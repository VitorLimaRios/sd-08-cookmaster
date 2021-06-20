const { Router } = require('express');
const UserController = require('./users/controllers/User');
const RecipeController = require('./recipes/controllers/Recipe');
const ValidateToken = require('./auth/validateJWT');

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.post('/login', UserController.login);

router.get('/recipes/:id', RecipeController.index);
router.get('/recipes', RecipeController.index);
router.post('/recipes', ValidateToken, RecipeController.store);

module.exports = router;
