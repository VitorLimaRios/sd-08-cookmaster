const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
