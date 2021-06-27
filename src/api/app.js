const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const userController = require('./controllers/userController');

app.use(bodyParser.json());

//config multer - TESTE
const uploadsPath = `${__dirname}/../uploads`;
app.use(express.static(path.join(uploadsPath)));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsPath);
  },
  filename:(req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({storage});

const uploadMax = 5;
const STATUS_OK = 200;

app.post('/images', upload.array('file', uploadMax), (req, res) =>
  res.send({message: 'arquivo recebido'}).status(STATUS_OK)
);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);
// app.use('/login');
// app.use('/recipes');

module.exports = app;
