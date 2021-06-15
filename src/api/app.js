const express = require('express');

const usersServices = require('../controllers/usersControllers');
const loginControllers = require('../controllers/loginControllers');
const recipesControllers = require('../controllers/recipesControllers');

const app = express();
const { resolve } = require('path');

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
app.use('/users', usersServices);
app.use('/login', loginControllers);
app.use('/recipes', recipesControllers);

module.exports = app;
