const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const uploadController = require('./controllers/uploadController');

app.use(bodyParser.json());

const uploadsPath = `${__dirname}/../uploads`;
app.use(express.static(path.join(uploadsPath)));

app.use('/images', uploadController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);
// app.use('/login');
// app.use('/recipes');

module.exports = app;
