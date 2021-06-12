const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const users = require('../models/usersModel')
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

app.get('/users', async (_req, res) => {
  return res.status(200).send({ users: await users.getAllTheUsers() })
});

app.get('/user', async (req, res) => {
  const { name } = req.body;
  const foundUser = await users.findUserByName(name);
  if (!foundUser) return res.status(404).send({ message: 'User not found' })
  return res.status(200).send({ user: foundUser });
});

app.post('/users', async (req, res) => {
  const newUser = req.body;
  await users.createNewUser(newUser);
  const checkEmailUnique = (await users.getAllTheUsers()).find((database) => database.email === 'xablaus');
  console.log(checkEmailUnique ? 'true' : 'false')
  return res.status(201).send({ message: `usuário adicionado: ${JSON.stringify(req.body)}` })
});

app.delete('/users', async (req, res) => {
  await users.deleteUser(req.body.name);
  return res.status(200).send({ message: `usuário deletado ${req.body.name}` })
});

module.exports = app;
