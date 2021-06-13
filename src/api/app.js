const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const errorMiddleware = require('../controllers/errorMiddleware');
const usersRoutes = require('../routes/usersRoutes'); 
const recipesRoutes = require('../routes/recipesRoutes'); 

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);

app.use(errorMiddleware);


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
