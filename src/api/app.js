const express = require('express');
const path = require('path');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/image', express.static(path.join(__dirname, '..', 'uploadas')));

module.exports = app;
