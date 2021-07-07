const express = require('express');
const path = require('path');

const user = require('../routes/user');
const error = require('../middlewares/error');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', user);

app.use(error);

module.exports = app;
