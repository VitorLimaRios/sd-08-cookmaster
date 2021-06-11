const express = require('express');
const bodyParser = require('body-parser');
const { createUser } = require('../controllers/userController');

const app = express();

app.use(bodyParser.json());

app.route('/user')
  .post(createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
