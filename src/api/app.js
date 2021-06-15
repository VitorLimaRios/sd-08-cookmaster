const express = require('express');
const routes = require('../routes');
const { resolve } = require('path');
const RecipesController = require('../controllers/RecipesController');
const uploadImage = require('../services/UploadImage');
const { default: VerifyToken } = require('../middlewares/VerifyToken');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/', routes);
app.put(
  '/recipes/:id/image/',
  VerifyToken,
  uploadImage(),
  RecipesController.upload,
);

module.exports = app;
