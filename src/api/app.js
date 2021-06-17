const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const { isValidName, isValidEmail, isValidPassword } = require('../middlewares/users');
const { auth } = require('../middlewares/recipes');
const usersControllers = require('../controllers/users');
const recipesControllers = require('../controllers/recipes');
const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', isValidName, isValidEmail, isValidPassword, usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', auth, recipesControllers.create);
app.get('/recipes', recipesControllers.getAll);
app.get('/recipes/:id', recipesControllers.getById);
app.put('/recipes/:id', auth, recipesControllers.updateById);
app.delete('/recipes/:id', auth, recipesControllers.deleteById);
app.put('/recipes/:id/image/',
  auth, upload.single('image'), recipesControllers.addImage);
app.get('/recipes/:id/image/', recipesControllers.getImage);

module.exports = app;
