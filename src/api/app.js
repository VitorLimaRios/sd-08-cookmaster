const express = require('express');
const path = require('path');

const errorMiddleware = require('../middlewares/error');
const { login } = require('../controllers/login');
const UserRouter = require('../routes/users');
const RecipesRouter = require('../routes/recipes');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/login', login );
app.use('/users', UserRouter);
app.use('/recipes', RecipesRouter);


app.use(errorMiddleware);

module.exports = app;
