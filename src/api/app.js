const express = require('express');
const path = require('path');
const users = require('../routes/users');
const recipes = require('../routes/recipes');
const login = require('../controllers/login');
const middlewares = require('../middlewares');
const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', users);

app.post('/login', login);

app.use('/recipes', recipes);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(middlewares.error);

module.exports = app;
