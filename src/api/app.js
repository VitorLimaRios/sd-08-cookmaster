const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router } = require('./routes/usersControler');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/image', express.static(path.join(__dirname, '..', 'uploadas')));

app.use('/users', router);

module.exports = app;


