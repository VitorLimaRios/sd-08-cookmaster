const express = require('express');

const app = express();
const userRouter = require('../routes/usersRouter');

app.use(userRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
