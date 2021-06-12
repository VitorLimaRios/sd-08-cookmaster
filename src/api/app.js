const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const controllerUser = require('../controllers/usersController');
const controllerRecipe = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const app = express();
app.use(bodyParser.json());
app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.route('/users')
  .post(controllerUser.createUser);

app.route('/login')
  .post(controllerUser.loginUser);

app.route('/recipes')
  .post(middlewares.validateJWT ,controllerRecipe.createRecipe)
  .get(controllerRecipe.getAllRecipes);

app.route('/recipes/:id')
  .get(controllerRecipe.getRecipeId)
  .put(middlewares.validateJWT, middlewares.validateUser, controllerRecipe.updateRecipe)
  .delete(middlewares.validateJWT, middlewares.validateUser,
    controllerRecipe.deleteRecipe);

app.route('/recipes/:id/image')
  .put(middlewares.validateJWT, middlewares.validateUser,
    middlewares.multer.single('image'), controllerRecipe.createImage);

module.exports = app;
