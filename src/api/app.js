const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliado
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
