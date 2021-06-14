const express = require('express');
const RouterUsers = require('./router/users/router');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use('/', RouterUsers);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(error);

module.exports = app;
