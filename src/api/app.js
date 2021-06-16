const express = require('express');
const path = require('path');
const signUpRouter = require('../router/user.router');
const signInRouter = require('../router/login.router');
const recipeRouter = require('../router/recipe.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (req, res) => {
  res.send();
});

app.use('/recipes', recipeRouter);
app.use('/users', signUpRouter);
app.use('/login', signInRouter);
app.use('/images/', express.static(path.join(__dirname, '/../uploads')));

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
