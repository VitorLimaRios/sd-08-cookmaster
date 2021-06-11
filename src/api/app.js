const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const controllerUser = require('../controllers/usersController');
const controllerRecipe = require('../controllers/recipesController');
const middlewares = require('../middlewares/validateJWT');

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
  .post(middlewares.validateJWT ,controllerRecipe.createRecipe);
module.exports = app;
