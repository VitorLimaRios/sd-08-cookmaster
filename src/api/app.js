const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Users = require('../routes/users');

app.use('/users', Users);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
