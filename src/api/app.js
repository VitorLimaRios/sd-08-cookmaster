const express = require('express');
// const multer = require('multer');
// const path = require('path');

const app = express();

const usersControllers = ('./controllers/users');
//const recipesControllers = ('./controllers/recipes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.post('/users', usersControllers.create);

module.exports = app;
