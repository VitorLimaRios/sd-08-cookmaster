const express = require('express');

const usersController = require('../../controllers/users');
const usersModel = require('../../models/users');
const recipesController = require('../../controllers/recipes');
const login = require('../../middlewares/login');
const token = require('../../middlewares/token');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const OK = 200;
app.get('/users', async (req, res) => {
  const result = await usersModel.getAll();
  res.status(OK).json(result);
});

app.post('/users', usersController.createUser);
app.post('/login', login.login);
app.post('/recipes', token.tokenValidation, recipesController.createRecipe);
app.get('/recipes', recipesController.getAll);

module.exports = app;
