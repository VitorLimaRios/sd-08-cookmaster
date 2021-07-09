const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('../controllers/users');
const error = require('../middlewares/error');


const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', UserController.create);
app.post('/login', UserController.login);
app.post('/recipes');
app.get('/recipes');
app.get('/recipes/:id');
app.put('/recipes/:id');
app.delete('/recipes/:id');
app.put('/recipes/:id/image');

app.use(error);

module.exports = app;
