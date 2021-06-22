const express = require('express');
const bodyParser = require('body-parser');

const UsersController = require('../controllers/UsersController.js');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.addUser);

app.post('/login', UsersController.getLogin);

module.exports = app;
