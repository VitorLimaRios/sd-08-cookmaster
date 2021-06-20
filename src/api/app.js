const express = require('express');
const bodyParses = require('body-parser');

const userController = require('../controllers/userController');

const app = express();
app.use(bodyParses.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);

module.exports = app;
