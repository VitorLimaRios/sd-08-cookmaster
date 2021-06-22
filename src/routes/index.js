const Routes = require('express').Router();
const rescue = require('express-rescue');

const middlewares = require('../middlewares');

const ControllerUsers = require('../controllers/controllerUser');
const controllerUsers = new ControllerUsers();

const ControllerLogin = require('../controllers/controllerLogin');
const controllerLogin = new ControllerLogin();

const ControllerRecipe = require('../controllers/controllerRecipe');
const controllerRecipe= new ControllerRecipe();

const upload = require('../config/multer');
const CODE = require('../error/code');

Routes.get('/images/:id', (req, res) => res.status(CODE.ok));
Routes.post('/users', controllerUsers.create);
Routes.post('/login', controllerLogin.login);
Routes.post('/recipes', [middlewares.authentication, controllerRecipe.create]);
Routes.get('/recipes', controllerRecipe.getAll);
Routes.get('/recipes/:id', [middlewares.verifyObjectId, controllerRecipe.getOne]);
Routes.put('/recipes/:id', [
  middlewares.requiredToken,
  middlewares.authentication,
  middlewares.verifyObjectId,
  controllerRecipe.update
]);
Routes.delete('/recipes/:id', [
  middlewares.authentication,
  middlewares.verifyObjectId,
  controllerRecipe.deleteOneRecipe
]);
Routes.put('/recipes/:id/image/',
  middlewares.authentication,
  controllerRecipe.getUpload,
  upload.single('image'),
  (req, res) => {
    res.status(CODE.ok).json(req.recipe);
  }
);


module.exports = Routes;
