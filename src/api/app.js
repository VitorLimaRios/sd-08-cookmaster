const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');
const { resolve } = require('path'); //criar um caminho para a pasta uploads.
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

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

// app.use(express.static(resolve(__dirname, '..', 'src', 'uploads', 'ratinho.jpg')));

// const stream = fs.createReadStream('./zap.jpg');

// const formInfo = new FormData();
// formInfo.append('image', stream);

// const formHeaders = formInfo.getHeaders(); 

// const URL = 'http://localhost:3000/recipes/image';
// const dados = formInfo;

// axios.post(URL, dados, {headers: { ...formHeaders }})
//   .then(response => response)
//   .catch(error => error);

module.exports = app;