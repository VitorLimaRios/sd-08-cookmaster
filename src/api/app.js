const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const upload = require('../middlewares/multer');
const Error = require('../middlewares/error');

const app = express();
const apiRoutes = express.Router();

app.use(bodyParser.json());
app.use(apiRoutes);

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login);
apiRoutes.post('/recipes', routes.createRecipes);
apiRoutes.get('/recipes', routes.getRecipes);
apiRoutes.get('/recipes/:id', routes.getRecipeById);
apiRoutes.put('/recipes/:id', routes.editRecipeById);
apiRoutes.delete('/recipes/:id', routes.deleteRecipeById);
apiRoutes.put('/recipes/:id/image/', upload.single('image'), routes.uploadFile);
apiRoutes.get('/images/:id', routes.getImage);

app.use(Error);

module.exports = app;
