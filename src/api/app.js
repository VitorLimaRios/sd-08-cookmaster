const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const Users = require('../controllers/users');
const Recipes = require('../controllers/recipes');
const validateJWT = require('./validateJWT');
const validateUser = require('./validateUser');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', rescue(Users.add));
app.post('/users/admin', validateJWT, rescue(Users.addAdmin));
app.post('/login', rescue(Users.login));

app.post('/recipes', validateJWT, rescue(Recipes.add));
app.get('/recipes', rescue(Recipes.getAll));
app.get('/recipes/:id', rescue(Recipes.getById));
app.put('/recipes/:id', validateJWT, validateUser, rescue(Recipes.updateById));
app.delete('/recipes/:id', validateJWT, validateUser, rescue(Recipes.deleteById));
app.put(
  '/recipes/:id/image',
  validateJWT,
  validateUser,
  upload.single('image'),
  rescue(Recipes.addImage)
);

app.get('/images/:id', rescue(Recipes.getImage));

app.use((err, req, res, _next) => {
  const { code, message } = err;

  res.status(code).json({ message });
});

module.exports = app;
