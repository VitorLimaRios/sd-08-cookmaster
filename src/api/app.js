const express = require('express');
const bodyParser = require('body-parser');

const { validateNewUser } = require('../middlewares/users');
const { auth } = require('../middlewares/recipes');

const Users = require('../controllers/users');
const Recipes = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// app.get('/users', Users.getAll);
app.post('/users', validateNewUser, Users.create);

app.post('/login', Users.login);

app.post('/recipes', auth, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.getById);
app.put('/recipes/:id', auth, Recipes.update);

module.exports = app;