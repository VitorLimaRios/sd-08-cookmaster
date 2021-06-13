const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../../controllers/userController');
const loginController = require('../../controllers/loginController');
const recipeController = require('../../controllers/recipeController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);

module.exports = app;
