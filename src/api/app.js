const express = require('express');
const UserRouter = require('../routes/UserRouter');
const LoginRouter = require('../routes/LoginRouter');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', UserRouter);
app.use('/login', LoginRouter);

module.exports = app;
