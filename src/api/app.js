const express = require('express');
const loginController = require('../controllers/login');
const usersController = require('../controllers/user');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersController);
app.use('/login', loginController);

module.exports = app;
