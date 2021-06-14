const app = require('./app');
const express = require('express');
const errorMiddleware = require('../middlewares/error');
const users = require('../routes/users');
const login = require('../routes/login');
const recipes = require('../routes/recipes');
const image = require('../routes/image');
app.use(express.json());

const PORT = 3000;

app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', image);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(errorMiddleware);
