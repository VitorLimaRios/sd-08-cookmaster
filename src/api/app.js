const express = require('express');
const fileupload = require('express-fileupload');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', routes);

module.exports = app;
