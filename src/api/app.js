const express = require('express');
const path = require('path');
const { usersRouter, loginRouter, recipesRouter }  = require('../api/routes');
const recipesController = require('../controllers/recipesController');
const handleErrors = require('../middlewares/errorHandler');


const app = express();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.get('/images/:id', recipesController.getImage );
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use(handleErrors);
app.get('/', (_request, response) => { response.send();});

module.exports = app;
