const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('../controllers/users');
const recipesControllers = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersControllers.create);

app.post('/login', usersControllers.login);

app.post('/recipes', recipesControllers.create);

module.exports = app;
