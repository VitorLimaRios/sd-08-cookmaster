const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const userController = require('../controller/userController');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', userController.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
