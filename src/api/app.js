const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const { validateNewUser } = require('../middlewares/users');
const { auth } = require('../middlewares/recipes');

const Users = require('../controllers/users');
const Recipes = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/*
  /images é o caminho/end-point da API onde as imagens estarão disponíveis
  path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer
  deve salvar suas imagens ao realizar o upload
*/
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// https://github.com/tryber/sd-08-live-lectures/blob/lecture/28.2/io-multer/index.js
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads/'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage });

// app.get('/users', Users.getAll);
app.post('/users', validateNewUser, Users.create);

app.post('/login', Users.login);

app.post('/recipes', auth, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.getById);
app.put('/recipes/:id', auth, Recipes.update);
app.delete('/recipes/:id', auth, Recipes.exclude);
app.put(
  '/recipes/:id/image/',
  auth,
  upload.single('image'),
  Recipes.addImage
);

module.exports = app;