const express = require('express');
const path = require('path');
const middlewares = require('../middlewares');
const login = require('../controllers/login');
const users = require('../routes/users');
const recipes = require('../routes/recipes');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', users);

app.use('/recipes', recipes);

app.post('/login', login);

app.get('/ping', middlewares.auth, (_req, res) => res.json({ message: 'Pong!' }));

app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.error);

module.exports = app;
