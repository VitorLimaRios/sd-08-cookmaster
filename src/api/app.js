const express = require('express');
const loginController = require('../controllers/login');
const usersController = require('../controllers/user');
const recipesController = require('../controllers/recipe');

const app = express();
const { resolve } = require('path');

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

module.exports = app;
