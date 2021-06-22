const express = require('express');
const { resolve } = require('path');

const users = require('../routes/users');
const login = require('../routes/login');
const recipes = require('../routes/recipes');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);

module.exports = app;
