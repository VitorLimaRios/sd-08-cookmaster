const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/login');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);
app.use('/login', loginRouter);

module.exports = app;
