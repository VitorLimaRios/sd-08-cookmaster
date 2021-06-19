const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
// const userModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');
const { createUser, listUsers, login } = require('../controllers/userController');
const { checkLoginRequest } = require('../services/usersValidations');
const {
  listRecipes, searchRecipe, addRecipe,
  updateRecipe, deleteRecipe, addImage } = require('../controllers/recipesController');
const { checkIdSearch, validateToken } = require('../services/recipesValidations');
app.use(bodyParser.json());
// ...
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.resolve('src', 'uploads'));
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
    // callback(null, `${req.params.id}.${file.mimetype.split('/')[1]}`); // aqui seria para a imagem original, sem conversão
  }
});
const upload = multer({ storage });
// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.resolve('src', 'uploads')));


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);
app.post('/login', checkLoginRequest, login);
app.get('/recipes', listRecipes);
app.post('/recipes', validateToken, addRecipe);
app.put('/recipes/:id/image',
  validateToken, checkIdSearch, upload.single('image'), addImage);
app.get('/image/:id', searchRecipe);
app.get('/recipes/:id', checkIdSearch, searchRecipe);
app.put('/recipes/:id', validateToken, checkIdSearch, updateRecipe);

app.delete('/recipes/:id', validateToken, checkIdSearch, deleteRecipe);


// routes for testing, none vinculated with project
app.get('/users', listUsers);
// app.post('/images', upload.single('image'), (req, res) => {
//   console.log(req.url);
//   return res.send({ message: [req.protocol, req.get('host'), req.hostname, req.originalUrl, req.baseUrl] });
// });
app.post('/images/:id', upload.single('image'), addImage);


module.exports = app;
