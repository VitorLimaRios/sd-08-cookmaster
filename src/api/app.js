const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');
const { resolve } = require('path');

const userController = require('../../controllers/userController');
const loginController = require('../../controllers/loginController');
const recipeController = require('../../controllers/recipeController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

const storage = multer.diskStorage({
  destination: (_req, _file, callback) =>
    callback(null, resolve(__dirname, '..', 'uploads')),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage });

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);
app.use('/recipes/id', recipeController);
app.use('/recipes/id/image', upload.single('image'), recipeController);

module.exports = app;