const express = require('express');
const path = require('path');
const Users = require('../routes/Users');
const Login = require('../controllers/Login');
const Recipes = require('../routes/Recipes');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', Users);

app.use('/recipes', Recipes);

app.post('/login', Login);

app.use(errorMiddleware);

module.exports = app;
