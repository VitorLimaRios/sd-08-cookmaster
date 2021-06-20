const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { resolve } = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname + '/images')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/recipes', require('./controllers/recipesController'));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/users', require('./controllers/usersController'));
app.use('/login', require('./controllers/loginController'));

module.exports = app;
