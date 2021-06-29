const express = require('express');
const { usersRouter, loginRouter, recipesRouter }  = require('../api/routes');
const handleErrors = require('../middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use(handleErrors);
app.get('/', (_request, response) => { response.send();});

module.exports = app;
