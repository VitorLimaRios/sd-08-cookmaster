const express = require('express');
const bodyParser = require('body-parser');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/recipes', validateJWT, require('./controllers/recipesController'));
app.use('/users', require('./controllers/usersController'));
app.use('/login', require('./controllers/loginController'));

module.exports = app;
