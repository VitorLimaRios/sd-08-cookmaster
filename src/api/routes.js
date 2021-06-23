const express = require('express');

const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const userRouter = express.Router();
userRouter.post('/', userController.createUser);

const loginRouter = express.Router();
loginRouter.post('/', userController.loginUser);

const recipesRouter = express.Router();
recipesRouter.post('/', verifyAuthorization, recipeController.createRecipe);


module.exports = {
  userRouter, 
  loginRouter, 
  recipesRouter
};
