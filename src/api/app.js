const express = require('express');
const bodyParser = require('body-parser');

const usersServices = require('../controllers/usersControllers');
const loginControllers = require('../controllers/loginControllers');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersServices);
app.use('/login', loginControllers);

module.exports = app;
