const app = require('./app');
const express = require('express');
const path = require('path');
const errorMiddleware = require('../middlewares/error');
const users = require('../routes/users');
const login = require('../routes/login');
app.use(express.json());

const PORT = 3000;
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', users);
app.use('/login', login);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(errorMiddleware);
