const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const Error = require('./error');

const app = express();
const apiRoutes = express.Router();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRoutes);

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

app.use(Error);

module.exports = app;
