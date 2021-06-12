const express = require('express');
const bodyParser = require('body-parser');
const User = require('./controllers/users/User');
const validateInputMiddleware = require('./middlewares/users/validateInputMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

//Users
app.post('/users', validateInputMiddleware, User.create);

module.exports = app;
