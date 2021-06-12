const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const users = require('../models/usersModel');
const { create, getAll } = require('../controllers/userController');
const { validateUserCreation } = require('../services/usersValidations')
app.use(bodyParser.json());
// ...

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.resolve('src', 'uploads')));


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/all', getAll);

app.get('/user', async (req, res) => {
  const { name } = req.body;
  const foundUser = await users.findUserByName(name);
  if (!foundUser) return res.status(404).send({ message: 'User not found' })
  return res.status(200).send({ user: foundUser });
});

app.post('/users', validateUserCreation, create);

app.delete('/users', async (req, res) => {
  await users.deleteUserByName(req.body.name);
  return res.status(200).send({ message: `usuário deletado ${req.body.name}` })
});

module.exports = app;
