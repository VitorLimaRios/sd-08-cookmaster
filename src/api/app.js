const express = require('express');
const path = require('path');
const users = require('../routes/users');
const middlewares = require('../middlewares');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', users);

app.get('/ping', (_req, res) => res.json({ message: 'Pong!' }));

app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.error);

module.exports = app;
