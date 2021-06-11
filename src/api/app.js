const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
// const path = require('path');

const Users = require('../controllers/users');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', rescue(Users.add));
app.post('/login', rescue(Users.login));

app.use((err, req, res, _next) => {
  const { code, message } = err;
  
  res.status(code).json({ message });
});

// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
