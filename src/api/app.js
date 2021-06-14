require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const multer = require('multer');

const controllers = require('../controllers/index');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'src/uploads/'),
  filename: (req, file, cb) => {
    const { id } = req.params;
    const split = file.originalname.split('.');
    cb(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage });

app.post('/users', controllers.createUser);
app.post('/login', controllers.login);
app.post('/recipes', controllers.createRecipe);
app.get('/recipes', controllers.getAllRecipes);
app.get('/recipes/:id', controllers.getRecipeById);
app.put('/recipes/:id', controllers.updateRecipe);
app.delete('/recipes/:id', controllers.removeRecipe);
app.put('/recipes/:id/image', upload.single('image'), controllers.uploadImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
