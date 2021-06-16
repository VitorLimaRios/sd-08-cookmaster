const express = require('express');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);

app.use('/login', loginController);

app.use('/recipes', recipeController);

app.use('/images', express.static(`${__dirname}/uploads`));

module.exports = app;
