const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/users', usersRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
