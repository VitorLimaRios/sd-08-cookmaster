const express = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares/error');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.use(routes);
app.use(middlewares);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
