const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');
const tokenValidation = require('../middlewares/tokenValidation');
const validUser = require('../middlewares/validUser');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { mimetype } = file;
    const extension = mimetype.split('/')[1];
    callback(null, `${req.params.id}.${extension}`);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', userController.createUser);

app.post('/login', auth);

app.post('/recipes', tokenValidation, recipesController.createRecipes);

app.get('/recipes', recipesController.getRecipes);

app.get('/recipes/:id', recipesController.findRecipes);

app.put('/recipes/:id', tokenValidation, validUser, recipesController.updateRecipes);

app.delete('/recipes/:id', tokenValidation, validUser, recipesController.deleteRecipes);

app.put(
  '/recipes/:id/image',
  tokenValidation,
  validUser,
  upload.single('image'),
  recipesController.imageUpdate,
);
  
app.get('/images/:id.jpeg', recipesController.getImage);
  
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
