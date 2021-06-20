const express = require('express');

const app = express();

const userRouter = require('../routes/User');
const loginRouter = require('../routes/Login');

app.use('/users', userRouter);
app.use('/login', loginRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
