const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.use('/users', require('../controllers/usersController'));
app.use('/login', require('../controllers/loginController'));
app.use('/recipes', require('../controllers/recipesController'));
// const PORT = 3000;

// app.listen(PORT, () => console.log(`App ouvindo a porta ${PORT}!`));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
