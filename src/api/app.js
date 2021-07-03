const express = require('express');
const path = require('path');

const UserRouter = require('../routes/users');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', UserRouter);

app.use(errorMiddleware);

module.exports = app;
