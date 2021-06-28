const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);

module.exports = app;
