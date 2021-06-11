const express = require('express');
const route = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.json());
app.use(route);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
