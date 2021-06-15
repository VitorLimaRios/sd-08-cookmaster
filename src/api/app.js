const express = require('express');
const bodyParses = require('body-parser');
const path = require('path');

const usersController = require('../controllers/usersCon');
const loginController = require('../controllers/loginCon');
const recipesController = require('../controllers/recipesCon');
// const middlewares_users = require('../middlewares/usersPost');

const app = express();

app.use(bodyParses.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador


app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

module.exports = app;
