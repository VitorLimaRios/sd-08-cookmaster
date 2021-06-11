const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('../middlewares');

const app = express();

const userController = require('../controllers/userController');

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.post('/users', userController.createUser);

app.use(middleware.error);

module.exports = app;
