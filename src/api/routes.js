const express = require('express');

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const usersRouter = express.Router();
usersRouter.post('/', usersController.createUser);

const loginRouter = express.Router();
loginRouter.post('/', loginController.loginUser);

const recipesRouter = express.Router();
recipesRouter.post('/', verifyAuthorization, recipesController.createRecipe);
recipesRouter.get('/', recipesController.getAll);
recipesRouter.get('/:id', recipesController.getById);
recipesRouter.put('/:id', verifyAuthorization, recipesController.updateById);
recipesRouter.delete('/:id', verifyAuthorization, recipesController.remove);

module.exports = {
  usersRouter,
  loginRouter,
  recipesRouter
};
