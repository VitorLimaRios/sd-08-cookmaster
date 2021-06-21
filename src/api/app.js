const express = require('express');
const path = require('path');

const route = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
app.use(route);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;