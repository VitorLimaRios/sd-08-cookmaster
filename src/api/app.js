const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('../controllers/users');
const recipesControllers = require('../controllers/recipes');
const multer = require('multer');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploads'),
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({storage});

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static('uploads'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', recipesControllers.create);

app.get('/recipes/:id', recipesControllers.getById);
app.get('/recipes', recipesControllers.getAll);

app.put('/recipes/:id', recipesControllers.update);
app.put('/recipes/:id/image', upload.single('image'), recipesControllers.addImage);

app.delete('/recipes/:id', recipesControllers.erase);

module.exports = app;
