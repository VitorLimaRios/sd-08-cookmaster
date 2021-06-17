const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {resolve} = require('path');
const userController = require('./controllers/userController');
const validateJWT = require('./auth/validateJWT');
const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: (_req, _file, callback) =>
    callback(null, resolve(__dirname, '..', 'uploads')),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});
app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.cadastrarUsuario);

app.post('/login', userController.login);

app.post('/recipes', validateJWT.validateJWT, recipesController.criarReceita);

app.get('/recipes', recipesController.listarReceitas);

app.get('/recipes/:id', recipesController.buscarReceitaPorId);

app.put('/recipes/:id', validateJWT.validateJWT, recipesController.atualizarReceita);

app.delete('/recipes/:id', validateJWT.validateJWT, recipesController.deletarReceita);

app.put('/recipes/:id/image',
  validateJWT.validateJWT,
  upload.single('image'),
  recipesController.enviarImagem);
module.exports = app;
