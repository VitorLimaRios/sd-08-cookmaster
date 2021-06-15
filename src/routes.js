const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const RecipesController = require('./controllers/RecipesController');
const UserValidator = require('./validators/UserValidator');
const RecipesValidator = require('./validators/RecipesValidator');
const AuthVerify = require('./middlewares/AuthVerify');

router.post('/users', UserValidator.signup, UserController.addUser);
router.post('/login', UserValidator.login, UserController.login);
router.post(
  '/recipes',
  AuthVerify,
  RecipesValidator.addRecipes,
  RecipesController.addRecipe,
);
router.get('/recipes', RecipesController.list);
router.get('/recipes/:id', RecipesController.listOne);
router.put('/recipes/:id', RecipesController.edit);
router.delete('/recipes/:id', RecipesController.delete);


module.exports = router;
