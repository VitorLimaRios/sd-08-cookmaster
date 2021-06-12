const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersRouters = require('../routes/usersRoute');
const loginRouters = require('../routes/loginRoute');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// meus end-points

app.use(usersRouters);
app.use(loginRouters);

app.use(errorMiddleware);

module.exports = app;
