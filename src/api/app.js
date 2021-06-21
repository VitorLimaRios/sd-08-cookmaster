const express = require('express');
const path = require('path');


const users = require('../controllers/usersController');
const login = require('../controllers/loginController');
const recipes = require('../controllers/recipesController');
const auth = require('../middlewares/auth');


const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador


app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
app.use(auth);
app.use('/images/', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
