const express = require('express');

const users = require('../controllers/usersController');
const login = require('../controllers/loginController');
const recipes = require('../controllers/recipesController');


const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador


app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);


module.exports = app;
