const express = require('express');
const users = require('../routes/users');
const middlewares = require('../middlewares');
const app = express();

app.use(express.json());

app.use('/users', users);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(middlewares.error);

module.exports = app;
