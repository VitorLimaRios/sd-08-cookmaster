const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const validateJWT = require('./auth/validateJWT');
const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.cadastrarUsuario);

app.post('/login', userController.login);

app.post('/recipes', validateJWT.validateJWT, recipesController.criarReceita);

app.get('/recipes', recipesController.listarReceitas);

app.get('/recipes/:id', recipesController.buscarReceitaPorId);

app.put('/recipes/:id', validateJWT.validateJWT, recipesController.atualizarReceita);

module.exports = app;
