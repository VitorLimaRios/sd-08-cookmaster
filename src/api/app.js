const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const app = express();

app.use(express.json());

app.post('/users', userController.createUser);

app.post('/login', auth);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
