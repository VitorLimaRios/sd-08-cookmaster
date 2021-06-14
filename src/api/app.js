const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');

const app = express();

app.use(bodyParser.json());

console.log((__dirname.replace('/api', '/uploads')));

app.use('/images', express.static(__dirname.replace('/api', '/uploads')));

app.use('/users', routes.users);
app.use('/login', routes.login);
app.use('/recipes', routes.recipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
