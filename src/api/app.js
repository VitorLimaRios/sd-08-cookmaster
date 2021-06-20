const express = require('express');

const app = express();

const userRouter = require('../routes/User');

app.use('/users', userRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
